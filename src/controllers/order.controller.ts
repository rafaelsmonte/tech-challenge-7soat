import { OrderAdapter } from 'src/adapters/order.adapter';
import { PrismaCustomerGateway } from 'src/gateways/prisma-customer.gateway';
import { PrismaOrderProductGateway } from 'src/gateways/prisma-order-product.gateway';
import { PaymentGateway } from 'src/gateways/payment.gateway';
import { PrismaOrderGateway } from 'src/gateways/prisma-order.gateway';
import { PrismaProductGateway } from 'src/gateways/prisma-product.gateway';
import { Database } from 'src/interfaces/database.interface';
import { PaymentInterface } from 'src/interfaces/payment.interface';
import { ProductAndQuantity } from 'src/types/product-and-quantity.type';
import { OrderUseCases } from 'src/usecases/order.usecases';

export class OrderController {
  static async findAll(database: Database): Promise<string> {
    const orderGateway = new PrismaOrderGateway(database);
    const productGateway = new PrismaProductGateway(database);
    const customerGateway = new PrismaCustomerGateway(database);
    const orderProductGateway = new PrismaOrderProductGateway(database);

    const orders = await OrderUseCases.findAll(
      orderGateway,
      productGateway,
      customerGateway,
      orderProductGateway,
    );

    return OrderAdapter.adaptArrayJson(orders);
  }

  static async findById(database: Database, id: number): Promise<string> {
    const orderGateway = new PrismaOrderGateway(database);
    const productGateway = new PrismaProductGateway(database);
    const customerGateway = new PrismaCustomerGateway(database);
    const orderProductGateway = new PrismaOrderProductGateway(database);

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
    database: Database,
    payment: PaymentInterface,
    notes: string,
    productsAndQuantity: ProductAndQuantity[],
    customerId?: number,
  ): Promise<string> {
    const orderGateway = new PrismaOrderGateway(database);
    const productGateway = new PrismaProductGateway(database);
    const customerGateway = new PrismaCustomerGateway(database);
    const orderProductGateway = new PrismaOrderProductGateway(database);
    const paymentGateway = new PaymentGateway(payment)

    const orderAndProducts = await OrderUseCases.create(
      paymentGateway,
      orderGateway,
      productGateway,
      customerGateway, 
      orderProductGateway,
      productsAndQuantity,
      notes,
      customerId,
    );

    return OrderAdapter.adaptJson(orderAndProducts);
  }

  static async update(
    database: Database,
    id: number,
    status: string,
  ): Promise<string> {
    const orderGateway = new PrismaOrderGateway(database);
    const productGateway = new PrismaProductGateway(database);
    const customerGateway = new PrismaCustomerGateway(database);
    const orderProductGateway = new PrismaOrderProductGateway(database);

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

  static async delete(database: Database, id: number): Promise<void> {
    const orderGateway = new PrismaOrderGateway(database);
    const orderProductGateway = new PrismaOrderProductGateway(database);

    await OrderUseCases.delete(orderGateway, orderProductGateway, id);
  }

  // TODO implement update flow
}
