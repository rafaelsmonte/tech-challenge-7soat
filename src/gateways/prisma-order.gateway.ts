import { OrderStatus, Prisma, Order as PrismaOrder } from '@prisma/client';
import Decimal from 'decimal.js';
import { Order } from 'src/entities/order.entity';
import { Database } from 'src/interfaces/database.interface';
import { OrderGateway } from 'src/interfaces/order.gateway.interface';

export class PrismaOrderGateway implements OrderGateway {
  constructor(private database: Database) {}

  async findAll(): Promise<Order[]> {
    const orders: PrismaOrder[] = await this.database.order.findMany();

    return orders.map(
      (order) =>
        new Order(
          order.id,
          order.createdAt,
          order.updatedAt,
          order.notes,
          order.trackingId,
          new Decimal(order.totalPrice).toNumber(),
          order.status,
          order.customerId,
        ),
    );
  }

  async findById(id: number): Promise<Order | null> {
    const order: PrismaOrder = await this.database.order.findUnique({
      where: { id },
    });

    if (!order) return null;

    return new Order(
      order.id,
      order.createdAt,
      order.updatedAt,
      order.notes,
      order.trackingId,
      new Decimal(order.totalPrice).toNumber(),
      order.status,
      order.customerId,
    );
  }

  async create(order: Order): Promise<Order> {
    const createdOrder: PrismaOrder = await this.database.order.create({
      data: {
        notes: order.notes,
        trackingId: order.trackingId,
        totalPrice: new Prisma.Decimal(order.totalPrice),
        status: OrderStatus.AWAITING,
        customerId: order.customerId,
      },
    });

    return new Order(
      createdOrder.id,
      createdOrder.createdAt,
      createdOrder.updatedAt,
      createdOrder.notes,
      createdOrder.trackingId,
      new Decimal(order.totalPrice).toNumber(),
      createdOrder.status,
      createdOrder.customerId,
    );
  }

  async delete(id: number): Promise<void> {
    await this.database.order.delete({ where: { id } });
  }
}
