import { IDatabase } from '@interfaces/database.interface';
import { OrderUseCases } from '@usecases/order.usecases';
import { OrderAdapter } from 'src/adapters/order.adapter';
import { PrismaCustomerGateway } from 'src/gateways/prisma-customer.gateway';
import { PrismaOrderProductGateway } from 'src/gateways/prisma-order-product.gateway';
import { PrismaOrderGateway } from 'src/gateways/prisma-order.gateway';
import { PrismaProductGateway } from 'src/gateways/prisma-product.gateway';
import { ProductAndQuantity } from 'src/types/product-and-quantity.type';

export class OrderController {
  static async findAll(database: IDatabase): Promise<string> {
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

  static async findById(database: IDatabase, id: number): Promise<string> {
    const orderGateway = new PrismaOrderGateway(database);
    const productGateway = new PrismaProductGateway(database);
    const customerGateway = new PrismaCustomerGateway(database);
    const orderProductGateway = new PrismaOrderProductGateway(database);

    const productAndCategory = await OrderUseCases.findById(
      orderGateway,
      productGateway,
      customerGateway,
      orderProductGateway,
      id,
    );

    return OrderAdapter.adaptJson(productAndCategory);
  }

  static async create(
    database: IDatabase,
    notes: string,
    productsAndQuantity: ProductAndQuantity[],
    customerId?: number,
  ): Promise<string> {
    const orderGateway = new PrismaOrderGateway(database);
    const productGateway = new PrismaProductGateway(database);
    const customerGateway = new PrismaCustomerGateway(database);
    const orderProductGateway = new PrismaOrderProductGateway(database);

    const productAndCategory = await OrderUseCases.create(
      orderGateway,
      productGateway,
      customerGateway,
      orderProductGateway,
      productsAndQuantity,
      notes,
      customerId,
    );

    return OrderAdapter.adaptJson(productAndCategory);
  }

  static async delete(database: IDatabase, id: number): Promise<void> {
    const orderGateway = new PrismaOrderGateway(database);
    const orderProductGateway = new PrismaOrderProductGateway(database);

    await OrderUseCases.delete(orderGateway, orderProductGateway, id);
  }
}
