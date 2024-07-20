import { OrderProduct } from '@entities/order-product.entity';
import { OrderProductGateway } from '@interfaces/order-product.gateway.interface';
import { PrismaClient } from '@prisma/client';

// TODO implement

export class PrismaOrderProductGateway implements OrderProductGateway {
  constructor(private prisma: PrismaClient) {}

  async findByOrderId(orderId: number): Promise<OrderProduct[]> {
    const orderProducts = await this.prisma.orderProduct.findMany({
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
    const createdOrderProduct = await this.prisma.orderProduct.create({
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
    await this.prisma.orderProduct.delete({ where: { id } });
  }
}
