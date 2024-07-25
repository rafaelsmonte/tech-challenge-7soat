import {
  OrderStatus as PrismaOrderStatus,
  Prisma,
  Order as PrismaOrder,
} from '@prisma/client';
import Decimal from 'decimal.js';
import { Order } from 'src/entities/order.entity';
import { DatabaseError } from 'src/errors/database.error';
import { Database } from 'src/interfaces/database.interface';
import { OrderGateway } from 'src/interfaces/order.gateway.interface';

export class PrismaOrderGateway implements OrderGateway {
  constructor(private database: Database) {}

  async findAll(): Promise<Order[]> {
    try {
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
    } catch (error) {
      throw new DatabaseError('Failed to find orders');
    }
  }

  async findById(id: number): Promise<Order | null> {
    try {
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
    } catch (error) {
      throw new DatabaseError('Failed to find order');
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const createdOrder: PrismaOrder = await this.database.order.create({
        data: {
          notes: order.notes,
          trackingId: order.trackingId,
          totalPrice: new Prisma.Decimal(order.totalPrice),
          status: PrismaOrderStatus.AWAITING,
          customerId: order.customerId,
          paymentId: order.paymentId,
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
        createdOrder.paymentId,
      );
    } catch (error) {
      throw new DatabaseError('Failed to save order');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.database.order.delete({ where: { id } });
    } catch (error) {
      throw new DatabaseError('Failed to delete order');
    }
  }
}
