import { OrderProduct as PrismaOrderProduct } from '@prisma/client';
import { OrderProduct } from 'src/entities/order-product.entity';
import { DatabaseError } from 'src/errors/database.error';
import { Database } from 'src/interfaces/database.interface';
import { OrderProductGateway } from 'src/interfaces/order-product.gateway.interface';

export class PrismaOrderProductGateway implements OrderProductGateway {
  constructor(private database: Database) {}

  async findByOrderId(orderId: number): Promise<OrderProduct[]> {
    try {
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
    } catch (error) {
      throw new DatabaseError('Failed to find orderProducts');
    }
  }

  async create(orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const createdOrderProduct: PrismaOrderProduct =
        await this.database.orderProduct.create({
          data: {
            orderId: orderProduct.getOrderId(),
            productId: orderProduct.getProductId(),
            quantity: orderProduct.getQuantity(),
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
    } catch (error) {
      throw new DatabaseError('Failed to save orderProducts');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.database.orderProduct.delete({ where: { id } });
    } catch (error) {
      throw new DatabaseError('Failed to delete orderProducts');
    }
  }
}
