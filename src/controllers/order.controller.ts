import { OrderAdapter } from '../adapters/order.adapter';
import { CustomerGateway } from '../gateways/customer.gateway';
import { OrderProductGateway } from '../gateways/order-product.gateway';
import { OrderGateway } from '../gateways/order.gateway';
import { PaymentGateway } from '../gateways/payment-gateway';
import { ProductGateway } from '../gateways/product.gateway';
import { IDatabase } from '../interfaces/database.interface';
import { IPayment } from '../interfaces/payment.interface';
import { ProductAndQuantity } from '../types/product-and-quantity.type';
import { OrderUseCases } from '../usecases/order.usecases';

export class OrderController {
  static async findAll(database: IDatabase): Promise<string> {
    const orderGateway = new OrderGateway(database);
    const productGateway = new ProductGateway(database);
    const customerGateway = new CustomerGateway(database);
    const orderProductGateway = new OrderProductGateway(database);

    const orders = await OrderUseCases.findAll(
      orderGateway,
      productGateway,
      customerGateway,
      orderProductGateway,
    );

    return OrderAdapter.adaptArrayJson(orders);
  }

  static async findById(database: IDatabase, id: number): Promise<string> {
    const orderGateway = new OrderGateway(database);
    const productGateway = new ProductGateway(database);
    const customerGateway = new CustomerGateway(database);
    const orderProductGateway = new OrderProductGateway(database);

    const orderAndProducts = await OrderUseCases.findById(
      orderGateway,
      productGateway,
      customerGateway,
      orderProductGateway,
      id,
    );

    return OrderAdapter.adaptJson(orderAndProducts);
  }

  static async create(
    database: IDatabase,
    payment: IPayment,
    notes: string,
    productsAndQuantity: ProductAndQuantity[],
    customerId?: number,
  ): Promise<string> {
    const orderGateway = new OrderGateway(database);
    const productGateway = new ProductGateway(database);
    const customerGateway = new CustomerGateway(database);
    const orderProductGateway = new OrderProductGateway(database);
    const paymentGateway = new PaymentGateway(payment);

    const orderAndProductsAndPayment = await OrderUseCases.create(
      orderGateway,
      productGateway,
      customerGateway,
      orderProductGateway,
      paymentGateway,
      productsAndQuantity,
      notes,
      customerId,
    );

    return OrderAdapter.adaptJsonWithPayment(orderAndProductsAndPayment);
  }

  static async update(
    database: IDatabase,
    id: number,
    status: string,
  ): Promise<string> {
    const orderGateway = new OrderGateway(database);
    const productGateway = new ProductGateway(database);
    const customerGateway = new CustomerGateway(database);
    const orderProductGateway = new OrderProductGateway(database);

    const orderAndProducts = await OrderUseCases.update(
      orderGateway,
      productGateway,
      customerGateway,
      orderProductGateway,
      id,
      status,
    );

    return OrderAdapter.adaptJson(orderAndProducts);
  }

  static async updateStatusOnPaymentReceived(
    database: IDatabase,
    payment: IPayment,
    paymentId: number,
    dataID: string,
    signature: string | string[],
    requestId: string | string[],
    action: string,
  ): Promise<string> {
    const orderGateway = new OrderGateway(database);
    const orderProductGateway = new OrderProductGateway(database);
    const paymentGateway = new PaymentGateway(payment);

    const orderAndProducts = await OrderUseCases.updateStatusOnPaymentReceived(
      orderGateway,
      paymentGateway,
      orderProductGateway,
      paymentId,
      dataID,
      signature,
      requestId,
      action,
    );

    return OrderAdapter.adaptJson(orderAndProducts);
  }

  static async delete(database: IDatabase, id: number): Promise<void> {
    const orderGateway = new OrderGateway(database);
    const orderProductGateway = new OrderProductGateway(database);

    await OrderUseCases.delete(orderGateway, orderProductGateway, id);
  }
}
