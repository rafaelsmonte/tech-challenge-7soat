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

  // TODO add parameters
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
            order.paymentId,
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
        order.paymentId,
        order.customerId,
      );
    } catch (error) {
      throw new DatabaseError('Failed to find order');
    }
  }

  async findByPaymentId(paymentId: number): Promise<Order | null> {
    try {
      const order: PrismaOrder = await this.database.order.findFirst({
        where: { paymentId : paymentId },
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
        order.paymentId,
        order.customerId,
      );
    } catch (error) {
      throw new DatabaseError('Failed to find order');
    }
  }

  // TODO how to use transactions

  async create(order: Order): Promise<Order> {
    try {
      const createdOrder: PrismaOrder = await this.database.order.create({
        data: {
          notes: order.getNotes(),
          trackingId: order.getTrackingId(),
          totalPrice: new Prisma.Decimal(order.getTotalPrice()),
          status: PrismaOrderStatus.AWAITING,
          paymentId: order.getPaymentId(),
          customerId: order.getCustomerId(),
        },
      });

      return new Order(
        createdOrder.id,
        createdOrder.createdAt,
        createdOrder.updatedAt,
        createdOrder.notes,
        createdOrder.trackingId,
        new Decimal(createdOrder.totalPrice).toNumber(),
        createdOrder.status,
        createdOrder.paymentId,
        createdOrder.customerId,
      );
    } catch (error) {
      console.log(error)
      throw new DatabaseError('Failed to save order');
    }
  }

  async updateStatus(order: Order): Promise<Order> {
    try {
      const updatedOrder: PrismaOrder = await this.database.order.update({
        where: {
          id: order.getId(),
        },
        data: {
          status: PrismaOrderStatus[order.getStatus()],
        },
      });

      return new Order(
        updatedOrder.id,
        updatedOrder.createdAt,
        updatedOrder.updatedAt,
        updatedOrder.notes,
        updatedOrder.trackingId,
        new Decimal(updatedOrder.totalPrice).toNumber(),
        updatedOrder.status,
        updatedOrder.paymentId,
        updatedOrder.customerId,
      );
    } catch (error) {
      throw new DatabaseError('Failed to update order');
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
