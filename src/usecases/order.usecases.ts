import { ProductDetailWithQuantity } from 'src/types/product-detail-with-quantity.type';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';
import { Payment } from '../entities/payment.entity';
import { OrderStatus } from '../enum/order-status.enum';
import { CustomerNotFoundError } from '../errors/customer-not-found.error';
import { InvalidPaymentOrderStatusError } from '../errors/invalid-payment-status.error';
import { OrderNotFoundError } from '../errors/order-not-found.error';
import { ProductNotFoundError } from '../errors/product-not-found.error';
import { ICustomerGateway } from '../interfaces/customer.gateway.interface';
import { IOrderGateway } from '../interfaces/order.gateway.interface';
import { IPaymentGateway } from '../interfaces/payment.gateway.interface';
import { IProductGateway } from '../interfaces/product.gateway.interface';
import { ProductWithQuantity } from 'src/types/product-with-quantity.type';
import { OrderDetail } from 'src/types/order-detail.type';
import { OrderDetailWithPayment } from 'src/types/order-detail-with-payment.type';
import { CustomerUseCases } from './customer.usecases';

export class OrderUseCases {
  static async findAll(
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    customerGateway: ICustomerGateway,
  ): Promise<OrderDetail[]> {
    const ordersDetail: OrderDetail[] = [];

    const orders = await orderGateway.findAll();

    const filteredAndSortedOrders = this.filterAndSortOrders(orders);

    for (const order of filteredAndSortedOrders) {
      const customer = order.getCustomerId()
        ? await customerGateway.findById(order.getCustomerId())
        : null;

      const productsDetailWithQuantity: ProductDetailWithQuantity[] = [];

      for (const { productId, quantity } of order.getProductsWithQuantity()) {
        const product = await productGateway.findById(productId);

        productsDetailWithQuantity.push({
          product,
          quantity,
        });
      }

      ordersDetail.push({ order, customer, productsDetailWithQuantity });
    }

    return ordersDetail;
  }

  static async findById(
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    customerGateway: ICustomerGateway,
    id: number,
  ): Promise<OrderDetail> {
    const order = await orderGateway.findById(id);

    if (!order) throw new OrderNotFoundError('Order not found');

    const customer = order.getCustomerId()
      ? await customerGateway.findById(order.getCustomerId())
      : null;

    const productsDetailWithQuantity: ProductDetailWithQuantity[] = [];

    for (const { productId, quantity } of order.getProductsWithQuantity()) {
      const product = await productGateway.findById(productId);

      productsDetailWithQuantity.push({
        product,
        quantity,
      });
    }

    return { order, customer, productsDetailWithQuantity };
  }

  static async create(
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    customerGateway: ICustomerGateway,
    paymentGateway: IPaymentGateway,
    productsWithQuantity: ProductWithQuantity[],
    notes: string,
    accountId?: string,
  ): Promise<OrderDetailWithPayment> {
    let productsDetailWithQuantity: ProductDetailWithQuantity[] = [];
    let customer: Customer | null = null;
    let customerId: number | null = null;
    let totalPrice = 0;

    if (accountId) {
      customer = await CustomerUseCases.findByAccountIdOrCreate(
        customerGateway,
        accountId,
      );

      customerId = customer.getId();
    }

    for (const { productId, quantity } of productsWithQuantity) {
      const product = await productGateway.findById(productId);

      if (!product) throw new ProductNotFoundError('Product not found!');

      productsDetailWithQuantity.push({ product, quantity });

      totalPrice += product.getPrice() * quantity;
    }

    totalPrice = Number(totalPrice.toFixed(2));

    const payment = await paymentGateway.create(Payment.new(totalPrice));

    const newOrder = await orderGateway.create(
      Order.new(
        notes,
        0,
        totalPrice,
        OrderStatus.PAYMENT_PENDING,
        payment.getId(),
        productsWithQuantity,
        customerId,
      ),
    );

    return { order: newOrder, payment, customer, productsDetailWithQuantity };
  }

  static async update(
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    customerGateway: ICustomerGateway,
    id: number,
    status: string,
  ): Promise<OrderDetail> {
    const order = await orderGateway.findById(id);

    if (!order) throw new OrderNotFoundError('Order not found');

    const customer = order.getCustomerId()
      ? await customerGateway.findById(order.getCustomerId())
      : null;

    const productsDetailWithQuantity: ProductDetailWithQuantity[] = [];

    for (const { productId, quantity } of order.getProductsWithQuantity()) {
      const product = await productGateway.findById(productId);

      productsDetailWithQuantity.push({
        product,
        quantity,
      });
    }

    order.setStatus(status);

    const updatedOrder = await orderGateway.updateStatus(order);

    return { order: updatedOrder, customer, productsDetailWithQuantity };
  }

  static async updateStatusOnPaymentReceived(
    orderGateway: IOrderGateway,
    paymentGateway: IPaymentGateway,
    paymentId: number,
  ): Promise<void> {
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

    await orderGateway.updateStatus(order);
  }

  static async delete(orderGateway: IOrderGateway, id: number): Promise<void> {
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
