import { Customer } from 'src/entities/customer.entity';
import { OrderProduct } from 'src/entities/order-product.entity';
import { Order } from 'src/entities/order.entity';
import { Payment } from 'src/entities/payment.entity';
import { Product } from 'src/entities/product.entity';
import { OrderStatus } from 'src/enum/order-status.enum';
import { CustomerNotFoundError } from 'src/errors/customer-not-found.error';
import { OrderNotFoundError } from 'src/errors/order-not-found.error';
import { ProductNotFoundError } from 'src/errors/product-not-found.error';
import { PaymentGateway } from 'src/gateways/payment.gateway';
import { CustomerGateway } from 'src/interfaces/customer.gateway.interface';
import { OrderProductGateway } from 'src/interfaces/order-product.gateway.interface';
import { OrderGateway } from 'src/interfaces/order.gateway.interface';
import { ProductGateway } from 'src/interfaces/product.gateway.interface';
import { OrderAndProducts } from 'src/types/order-and-products.type';
import { ProductAndQuantity } from 'src/types/product-and-quantity.type';
import { v4 as uuidv4 } from 'uuid';

// TODO retornar todas as entidades associadas ou apenas seus IDs?
// TODO como utilizar transaction nesse cenário de queries encadeadas?

export class OrderUseCases {
  static async findAll(
    orderGateway: OrderGateway,
    productGateway: ProductGateway,
    customerGateway: CustomerGateway,
    orderProductGateway: OrderProductGateway,
  ): Promise<OrderAndProducts[]> {
    const orderAndProducts: OrderAndProducts[] = [];
    const productsAndQuantity: ProductAndQuantity[] = [];

    const orders = await orderGateway.findAll();

    orders.forEach(async (order) => {
      const orderProducts = await orderProductGateway.findByOrderId(
        order.getId(),
      );

      orderProducts.forEach((orderProduct) => {
        productsAndQuantity.push({
          productId: orderProduct.getProductId(),
          quantity: orderProduct.getQuantity(),
        });
      });

      orderAndProducts.push({ order, productsAndQuantity });
    });

    return orderAndProducts;
  }

  static async findById(
    orderGateway: OrderGateway,
    productGateway: ProductGateway,
    customerGateway: CustomerGateway,
    orderProductGateway: OrderProductGateway,
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
    paymentGateway: PaymentGateway,
    orderGateway: OrderGateway,
    productGateway: ProductGateway,
    customerGateway: CustomerGateway,
    orderProductGateway: OrderProductGateway,
    productsAndQuantity: ProductAndQuantity[],
    notes: string,
    customerId?: number,
  ): Promise<OrderAndProducts> {
    let customer: Customer | null;
    let products: Product[] = [];
    let totalPrice = 0;
    const paymentId = uuidv4();
    if (customerId) {
      customer = await customerGateway.findById(customerId);

      if (!customer) throw new CustomerNotFoundError('Customer not found!');
    }

    const productPromises = productsAndQuantity.map(async ({ productId, quantity }) => {
      const product = await productGateway.findById(productId);
    
      if (!product) throw new ProductNotFoundError('Product not found!');
    
      products.push(product);
    
      return product.price * quantity;
    });
    
    const prices = await Promise.all(productPromises);
    totalPrice = prices.reduce((sum, price) => sum + price, 0);

    const newOrder = await orderGateway.create(
      Order.new(notes, 0, totalPrice, OrderStatus.AWAITING, customerId,paymentId),
    );

    productsAndQuantity.forEach(async ({ productId, quantity }) => {
      await orderProductGateway.create(
        OrderProduct.new(newOrder.getId(), productId, quantity),
      );
    });

     paymentGateway.create(Payment.new(newOrder.paymentId,customer.email,newOrder.totalPrice))

    return { order: newOrder, productsAndQuantity };
  }

  static async update(
    orderGateway: OrderGateway,
    productGateway: ProductGateway,
    customerGateway: CustomerGateway,
    orderProductGateway: OrderProductGateway,
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

  static async delete(
    orderGateway: OrderGateway,
    orderProductGateway: OrderProductGateway,
    id: number,
  ): Promise<void> {
    const order = await orderGateway.findById(id);

    if (!order) throw new OrderNotFoundError('Order not found');

    await orderGateway.delete(id);
  }
}
