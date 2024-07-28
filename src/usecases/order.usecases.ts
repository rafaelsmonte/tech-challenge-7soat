import { Customer } from 'src/entities/customer.entity';
import { OrderProduct } from 'src/entities/order-product.entity';
import { Order } from 'src/entities/order.entity';
import { Payment } from 'src/entities/payment.entity';
import { Product } from 'src/entities/product.entity';
import { OrderStatus } from 'src/enum/order-status.enum';
import { CustomerNotFoundError } from 'src/errors/customer-not-found.error';
import { IncorrectPaymentSourceError } from 'src/errors/incorrect-payment-source.error';
import { InvalidPaymentOrderStatusError } from 'src/errors/invalid-payment-status.error';
import { IncorrectPaymentActionError } from 'src/errors/incorrect-payment-action.error';
import { OrderNotFoundError } from 'src/errors/order-not-found.error';
import { ProductNotFoundError } from 'src/errors/product-not-found.error';
import { ICustomerGateway } from 'src/interfaces/customer.gateway.interface';
import { IOrderProductGateway } from 'src/interfaces/order-product.gateway.interface';
import { IOrderGateway } from 'src/interfaces/order.gateway.interface';
import { IPaymentGateway } from 'src/interfaces/payment.gateway.interface';
import { IProductGateway } from 'src/interfaces/product.gateway.interface';
import { OrderAndProductsAndPayment } from 'src/types/order-and-products-and-payment.type';
import { OrderAndProducts } from 'src/types/order-and-products.type';
import { ProductAndQuantity } from 'src/types/product-and-quantity.type';

// TODO retornar todas as entidades associadas ou apenas seus IDs?
// TODO como utilizar transaction nesse cenário de queries encadeadas?

export class OrderUseCases {
  static async findAll(
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    customerGateway: ICustomerGateway,
    orderProductGateway: IOrderProductGateway,
  ): Promise<OrderAndProducts[]> {
    const orderAndProducts: OrderAndProducts[] = [];

    const orders = await orderGateway.findAll();

    for (const order of orders) {
      const orderProducts = await orderProductGateway.findByOrderId(
        order.getId(),
      );

      const productsAndQuantity: ProductAndQuantity[] = [];

      orderProducts.forEach((orderProduct) => {
        productsAndQuantity.push({
          productId: orderProduct.getProductId(),
          quantity: orderProduct.getQuantity(),
        });
      });

      orderAndProducts.push({ order, productsAndQuantity });
    }

    return orderAndProducts;
  }

  static async findById(
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    customerGateway: ICustomerGateway,
    orderProductGateway: IOrderProductGateway,
    id: number,
  ): Promise<OrderAndProducts> {
    const productsAndQuantity: ProductAndQuantity[] = [];

    const order = await orderGateway.findById(id);

    if (!order) throw new OrderNotFoundError('Order not found');

    const orderProducts = await orderProductGateway.findByOrderId(
      order.getId(),
    );

    orderProducts.forEach((orderProduct) => {
      productsAndQuantity.push({
        productId: orderProduct.getProductId(),
        quantity: orderProduct.getQuantity(),
      });
    });

    return { order, productsAndQuantity };
  }

  static async create(
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    customerGateway: ICustomerGateway,
    orderProductGateway: IOrderProductGateway,
    paymentGateway: IPaymentGateway,
    productsAndQuantity: ProductAndQuantity[],
    notes: string,
    customerId?: number,
  ): Promise<OrderAndProductsAndPayment> {
    let customer: Customer | null = null;
    let products: Product[] = [];
    let totalPrice = 0;
    const paymentTimOut =  Number(process.env.PAYMENT_TIMEOUT) || 5
    const paymentExpirationDate = new Date();
    paymentExpirationDate.setSeconds(paymentExpirationDate.getSeconds() + paymentTimOut);

    if (customerId) {
      customer = await customerGateway.findById(customerId);

      if (!customer) throw new CustomerNotFoundError('Customer not found!');
    }

    for (const { productId, quantity } of productsAndQuantity) {
      const product = await productGateway.findById(productId);

      if (!product) throw new ProductNotFoundError('Product not found!');

      products.push(product);

      totalPrice += product.getPrice() * quantity;
    }

    totalPrice = Number(totalPrice.toFixed(2));

    const payment = await paymentGateway.create(
      Payment.new(totalPrice,paymentExpirationDate, customer?.getEmail()),
    );

    const newOrder = await orderGateway.create(
      Order.new(
        notes,
        0,
        totalPrice,
        OrderStatus.PAYMENT_PENDING,
        payment.getId(),
        customerId,
      ),
    );

    for (const { productId, quantity } of productsAndQuantity) {
      await orderProductGateway.create(
        OrderProduct.new(newOrder.getId(), productId, quantity),
      );
    }

    return { order: newOrder, productsAndQuantity, payment };
  }

  static async update(
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    customerGateway: ICustomerGateway,
    orderProductGateway: IOrderProductGateway,
    id: number,
    status: string,
  ): Promise<OrderAndProducts> {
    const productsAndQuantity: ProductAndQuantity[] = [];

    const order = await orderGateway.findById(id);

    if (!order) throw new OrderNotFoundError('Order not found');

    const orderProducts = await orderProductGateway.findByOrderId(
      order.getId(),
    );

    orderProducts.forEach((orderProduct) => {
      productsAndQuantity.push({
        productId: orderProduct.getProductId(),
        quantity: orderProduct.getQuantity(),
      });
    });

    order.setStatus(status);

    const updatedOrder = await orderGateway.updateStatus(order);

    return { order: updatedOrder, productsAndQuantity };
  }

  static async updateStatusOnPaymentReceived(
    orderGateway: IOrderGateway,
    paymentGateway: IPaymentGateway,
    orderProductGateway: IOrderProductGateway,
    paymentId: number,
    dataID: string,
    signature: string | string[],
    requestId: string | string[],
    action: string,
  ): Promise<OrderAndProducts> {
    const checkPaymentSource = paymentGateway.checkPaymentSource(
      dataID,
      signature,
      requestId,
      action,
    );

    if (!checkPaymentSource)
      throw new IncorrectPaymentSourceError('Incorrect Payment Source');

    const checkPaymentAction = paymentGateway.checkPaymentAction(action)
    
    if (!checkPaymentAction)
      throw new IncorrectPaymentActionError ('Incorrect Payment Action');

    const order = await orderGateway.findByPaymentId(paymentId);

    if (!order) throw new OrderNotFoundError('Order not found');

    if (order.getStatus() != OrderStatus.PAYMENT_PENDING)
      throw new InvalidPaymentOrderStatusError('Order status is not payment pending');

    const paymentStatus = await paymentGateway.getPaymenteStatus(paymentId)

    order.setStatus(paymentStatus);

    const updatedOrder = await orderGateway.updateStatus(order);

    const orderProducts = await orderProductGateway.findByOrderId(
      order.getId(),
    );

    const productsAndQuantity: ProductAndQuantity[] = [];

    orderProducts.forEach((orderProduct) => {
      productsAndQuantity.push({
        productId: orderProduct.getProductId(),
        quantity: orderProduct.getQuantity(),
      });
    });

    return { order: updatedOrder, productsAndQuantity };
  }

  static async delete(
    orderGateway: IOrderGateway,
    orderProductGateway: IOrderProductGateway,
    id: number,
  ): Promise<void> {
    const order = await orderGateway.findById(id);

    if (!order) throw new OrderNotFoundError('Order not found');

    await orderGateway.delete(id);
  }
}
