import { Order } from '@entities/order.entity';
import { OrderGateway } from '@interfaces/order.gateway.interface';
import { PrismaClient } from '@prisma/client';

// TODO implement

export class PrismaOrderGateway implements OrderGateway {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();

    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.createdAt,
          order.updatedAt,
          order.notes,
          order.trackingId,
          order.totalPrice,
          order.status,
          order.customerId,
        ),
    );
  }

  async findById(id: number): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({ where: { id } });

    if (!order) return null;

    return new Order(
      order.id,
      order.createdAt,
      order.updatedAt,
      order.notes,
      order.trackingId,
      order.totalPrice,
      order.status,
      order.customerId,
    );
  }

  async create(order: Order): Promise<Order> {
    const createdOrder = await this.prisma.order.create({
      data: {
        notes: order.notes,
        trackingId: order.trackingId,
        totalPrice: order.totalPrice,
        status: order.status,
        customerId: order.customerId,
      },
    });

    return new Order(
      createdOrder.id,
      createdOrder.createdAt,
      createdOrder.updatedAt,
      createdOrder.notes,
      createdOrder.trackingId,
      createdOrder.totalPrice,
      createdOrder.status,
      createdOrder.customerId,
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }
}
