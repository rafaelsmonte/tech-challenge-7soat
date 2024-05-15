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
    try {
      const orderData = {
        costumerId: orderDTO.costumerId,
        notes: orderDTO.notes,
        trackingId: 1, // TODO generate a random int
        status: OrderStatus.AWAITING,
      };

      const createdOrder = await this.prisma.order.create({
        data: orderData,
      });

      const orderEntity = new OrderEntity(createdOrder);

      orderDTO.orderProducts.forEach(async (orderProduct) => {
        const product = await this.prisma.product.findFirst({
          where: { id: orderProduct.productId },
        });

        const orderProductData = {
          orderId: createdOrder.id,
          productId: orderProduct.productId,
          quantity: orderProduct.quantity,
          unitPrice: product.price,
        };

        const createdOrderProduct = await this.prisma.orderProduct.create({
          data: orderProductData,
        });

        orderEntity.orderProducts.push(createdOrderProduct);
      });

      return orderEntity;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(): Promise<OrderEntity[]> {
    const rawOrders = await this.prisma.$queryRaw<any[]>`
    SELECT o.id, c.id AS "clientId", c."name" AS "costumerName", p."id" AS "productId", p."name" AS "productName", op.quantity, op."unitPrice", o.status
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
        unitPrice: row.unitPrice,
      });

      return acc;
    }, []);

    return orders;
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
