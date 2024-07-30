import { IncorrectPaymentActionError } from '../errors/incorrect-payment-action.error';
import { Customer } from '../entities/customer.entity';
import { OrderProduct } from '../entities/order-product.entity';
import { Order } from '../entities/order.entity';
import { Payment } from '../entities/payment.entity';
import { Product } from '../entities/product.entity';
import { OrderStatus } from '../enum/order-status.enum';
import { CustomerNotFoundError } from '../errors/customer-not-found.error';
import { IncorrectPaymentSourceError } from '../errors/incorrect-payment-source.error';
import { InvalidPaymentOrderStatusError } from '../errors/invalid-payment-status.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { ProductNotFoundError } from '../errors/product-not-found.error';
import { ICustomerGateway } from '../interfaces/customer.gateway.interface';
import { IOrderProductGateway } from '../interfaces/order-product.gateway.interface';
import { IOrderGateway } from '../interfaces/order.gateway.interface';
import { IPaymentGateway } from '../interfaces/payment.gateway.interface';
import { IProductGateway } from '../interfaces/product.gateway.interface';
import { OrderAndProductsAndPayment } from '../types/order-and-products-and-payment.type';
import { OrderAndProducts } from '../types/order-and-products.type';
import { ProductAndQuantity } from '../types/product-and-quantity.type';

export class OrderUseCases {
  static async findAll(
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    customerGateway: ICustomerGateway,
    orderProductGateway: IOrderProductGateway,
  ): Promise<OrderAndProducts[]> {
    const orderAndProducts: OrderAndProducts[] = [];

    const orders = await orderGateway.findAll();

    const filteredAndSortedOrders = this.filterAndSortOrders(orders);

    for (const order of filteredAndSortedOrders) {
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

    const paymentTimeout = Number(process.env.PAYMENT_TMEOUT) || 5;
    const paymentExpirationDate = new Date();
    paymentExpirationDate.setSeconds(
      paymentExpirationDate.getSeconds() + paymentTimeout,
    );

    const payment = await paymentGateway.create(
      Payment.new(totalPrice, paymentExpirationDate, customer?.getEmail()),
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
  ): Promise<OrderAndProducts> {

    const order = await orderGateway.findByPaymentId(paymentId);

    if (!order) throw new OrderNotFoundError('Order not found');

    if (order.getStatus() != OrderStatus.PAYMENT_PENDING)
      throw new InvalidPaymentOrderStatusError(
        'Order status is not payment pending',
      );

    if (await paymentGateway.isPaymentApproved(paymentId)) {
      order.setStatus(OrderStatus.AWAITING);
    } else {
      order.setStatus(OrderStatus.PAYMENT_FAILED);
    }

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

  static filterAndSortOrders(orders: Order[]): Order[] {
    const unfinishedOrders = orders.filter(
      (order) => order.getStatus() !== OrderStatus.FINISHED,
    );

    const statusOrder = {
      [OrderStatus.DONE]: 1,
      [OrderStatus.IN_PROGRESS]: 2,
      [OrderStatus.AWAITING]: 3,
    };

    const sortedOrders = unfinishedOrders.sort((a, b) => {
      const statusComparison =
        statusOrder[a.getStatus()] - statusOrder[b.getStatus()];

      if (statusComparison !== 0) return statusComparison;

      return (
        new Date(a.getCreatedAt()).getTime() -
        new Date(b.getCreatedAt()).getTime()
      );
    });

    return sortedOrders;
  }
}
