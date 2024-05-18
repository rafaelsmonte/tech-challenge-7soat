import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { OrderEntity } from 'src/order/domain/model/order.entity';
import { IOrderRepository } from 'src/order/domain/outboundPorts/order-repository.interface';
import { CreateOrderDTO } from '../model/create-order.dto';
import { UpdateOrderDTO } from '../model/update-order.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(orderDTO: CreateOrderDTO): Promise<OrderEntity> {
    const createdOrder = await this.prisma.order.create({
      data: {
        costumer: {
          connect: { id: orderDTO.costumerId },
        },
        notes: orderDTO.notes,
        trackingId: 1, // TODO generate random int
        orderProducts: {
          create: orderDTO.orderProducts.map((orderProduct) => ({
            product: {
              connect: { id: orderProduct.productId },
            },
            quantity: orderProduct.quantity,
          })),
        },
      },
    });

    return new OrderEntity(createdOrder);
  }

  async list(): Promise<OrderEntity[]> {
    const rawOrders = await this.prisma.$queryRaw<any[]>`
    SELECT o.id, c.id AS "clientId", c."name" AS "costumerName", p."id" AS "productId", p."name" AS "productName", op.quantity, o.status
    FROM orders o
    LEFT JOIN costumers c ON c.id = o."costumerId"
    INNER JOIN "orderProducts" op ON op."orderId" = o.id
    INNER JOIN products p ON p.id = op."productId"
  `;

    const orders: OrderEntity[] = rawOrders.reduce((acc, row) => {
      let order = acc.find((order) => order.id === row.id);

      if (!order) {
        const costumer = row.clientId
          ? { id: row.clientId, name: row.costumerName }
          : null;

        order = {
          id: row.id,
          status: row.status,
          costumer: costumer,
          orderProducts: [],
        };

        acc.push(order);
      }

      order.orderProducts.push({
        productId: row.productId,
        productName: row.productName,
        quantity: row.quantity,
      });

      return acc;
    }, []);

    return orders;
  }

  async retrieve(id: number): Promise<OrderEntity> {
    const rawOrder = await this.prisma.$queryRaw<any>`
      SELECT o.id, c.id AS "clientId", c."name" AS "costumerName", p."id" AS "productId", p."name" AS "productName", op.quantity, o.status
      FROM orders o
      LEFT JOIN costumers c ON c.id = o."costumerId"
      INNER JOIN "orderProducts" op ON op."orderId" = o.id
      INNER JOIN products p ON p.id = op."productId"
      WHERE o.id = ${id}
  `;

    const order: OrderEntity[] = rawOrder.reduce((acc, row) => {
      let order = acc.find((order) => order.id === row.id);

      if (!order) {
        const costumer = row.clientId
          ? { id: row.clientId, name: row.costumerName }
          : null;

        order = {
          id: row.id,
          status: row.status,
          costumer: costumer,
          orderProducts: [],
        };

        acc.push(order);
      }

      order.orderProducts.push({
        productId: row.productId,
        productName: row.productName,
        quantity: row.quantity,
      });

      return acc;
    }, []);

    return order[0];
  }

  async delete(id: number): Promise<void> {
    await this.prisma.order.delete({ where: { id: id } });
  }

  async update(id: number, orderDTO: UpdateOrderDTO): Promise<OrderEntity> {
    // TOOD implement update logic
    return new OrderEntity({});
    // return await this.prisma.order.update({
    //   where: { id: id },
    //   data: orderDTO,
    // });
  }
}
