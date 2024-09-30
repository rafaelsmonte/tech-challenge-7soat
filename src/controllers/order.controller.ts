import { ProductWithQuantity } from 'src/types/product-with-quantity.type';
import { OrderAdapter } from '../adapters/order.adapter';
import { CustomerGateway } from '../gateways/customer.gateway';
import { OrderGateway } from '../gateways/order.gateway';
import { PaymentGateway } from '../gateways/payment-gateway';
import { ProductGateway } from '../gateways/product.gateway';
import { IDatabase } from '../interfaces/database.interface';
import { IPayment } from '../interfaces/payment.interface';
import { OrderUseCases } from '../usecases/order.usecases';

export class OrderController {
  static async findAll(database: IDatabase): Promise<string> {
    const orderGateway = new OrderGateway(database);
    const productGateway = new ProductGateway(database);
    const customerGateway = new CustomerGateway(database);

    const orders = await OrderUseCases.findAll(
      orderGateway,
      productGateway,
      customerGateway,
    );

    return OrderAdapter.adaptArrayJson(orders);
  }

  static async findById(database: IDatabase, id: number): Promise<string> {
    const orderGateway = new OrderGateway(database);
    const productGateway = new ProductGateway(database);
    const customerGateway = new CustomerGateway(database);

    const ordersDetail = await OrderUseCases.findById(
      orderGateway,
      productGateway,
      customerGateway,
      id,
    );

    return OrderAdapter.adaptJson(ordersDetail);
  }

  static async create(
    database: IDatabase,
    payment: IPayment,
    notes: string,
    productWithQuantity: ProductWithQuantity[],
    accountId?: string,
  ): Promise<string> {
    const orderGateway = new OrderGateway(database);
    const productGateway = new ProductGateway(database);
    const customerGateway = new CustomerGateway(database);
    const paymentGateway = new PaymentGateway(payment);

    const ordersDetailWithPayment = await OrderUseCases.create(
      orderGateway,
      productGateway,
      customerGateway,
      paymentGateway,
      productWithQuantity,
      notes,
      accountId,
    );

    return OrderAdapter.adaptJsonWithPayment(ordersDetailWithPayment);
  }

  static async update(
    database: IDatabase,
    id: number,
    status: string,
  ): Promise<string> {
    const orderGateway = new OrderGateway(database);
    const productGateway = new ProductGateway(database);
    const customerGateway = new CustomerGateway(database);

    const ordersDetail = await OrderUseCases.update(
      orderGateway,
      productGateway,
      customerGateway,
      id,
      status,
    );

    return OrderAdapter.adaptJson(ordersDetail);
  }

  static async updateStatusOnPaymentReceived(
    database: IDatabase,
    payment: IPayment,
    paymentId: number,
  ): Promise<void> {
    const orderGateway = new OrderGateway(database);
    const paymentGateway = new PaymentGateway(payment);

    await OrderUseCases.updateStatusOnPaymentReceived(
      orderGateway,
      paymentGateway,
      paymentId,
    );
  }

  static async delete(database: IDatabase, id: number): Promise<void> {
    const orderGateway = new OrderGateway(database);

    await OrderUseCases.delete(orderGateway, id);
  }
}
