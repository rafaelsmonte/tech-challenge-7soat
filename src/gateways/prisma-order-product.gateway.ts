import {
  PrismaClient,
  OrderProduct as PrismaOrderProduct,
} from '@prisma/client';
import { OrderProduct } from 'src/entities/order-product.entity';
import { Database } from 'src/interfaces/database.interface';
import { OrderProductGateway } from 'src/interfaces/order-product.gateway.interface';

export class PrismaOrderProductGateway implements OrderProductGateway {
  constructor(private database: Database) {}

  async findByOrderId(orderId: number): Promise<OrderProduct[]> {
    const orderProducts: PrismaOrderProduct[] =
      await this.database.orderProduct.findMany({
        where: { orderId },
      });

    return orderProducts.map(
      (orderProduct) =>
        new OrderProduct(
          orderProduct.id,
          orderProduct.createdAt,
          orderProduct.updatedAt,
          orderProduct.orderId,
          orderProduct.productId,
          orderProduct.quantity,
        ),
    );
  }

  async create(orderProduct: OrderProduct): Promise<OrderProduct> {
    const createdOrderProduct: PrismaOrderProduct =
      await this.database.orderProduct.create({
        data: {
          orderId: orderProduct.orderId,
          productId: orderProduct.productId,
          quantity: orderProduct.quantity,
        },
      });

    return new OrderProduct(
      createdOrderProduct.id,
      createdOrderProduct.createdAt,
      createdOrderProduct.updatedAt,
      createdOrderProduct.orderId,
      createdOrderProduct.productId,
      createdOrderProduct.quantity,
    );
  }

  async delete(id: number): Promise<void> {
    await this.database.orderProduct.delete({ where: { id } });
  }
}
