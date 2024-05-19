import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { OrderEntity } from 'src/order/domain/model/order.entity';
import { IOrderRepository } from 'src/order/domain/outboundPorts/order-repository.interface';
import { CreateOrderDTO } from '../model/create-order.dto';
import { UpdateOrderDTO } from '../model/update-order.dto';
import { OrderStatus } from 'src/common/enum/order-status.enum';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(orderDTO: CreateOrderDTO): Promise<OrderEntity> {
    const productIds = orderDTO.orderProducts.map(
      (orderProduct) => orderProduct.productId,
    );

    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true },
    });

    const totalPrice = orderDTO.orderProducts.reduce((acc, orderProduct) => {
      const product = products.find((p) => p.id === orderProduct.productId);
      return acc + (product?.price?.toNumber() ?? 0) * orderProduct.quantity;
    }, 0);

    const createdOrder = await this.prisma.order.create({
      data: {
        costumer: {
          ...(orderDTO.costumerId !== undefined
            ? {
                connect: {
                  id: orderDTO.costumerId,
                },
              }
            : {}),
        },
        notes: orderDTO.notes,
        totalPrice: totalPrice,
        trackingId: 1, // TODO generate random int
        status: OrderStatus.AWAITING,
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

    return this.findOne(createdOrder.id);
  }

  async list(): Promise<OrderEntity[]> {
    const orders = await this.prisma.order.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        notes: true,
        status: true,
        trackingId: true,
        costumer: true,
        totalPrice: true,
        orderProducts: {
          select: {
            quantity: true,
            product: {
              select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                name: true,
                price: true,
                description: true,
                pictures: true,
                category: true,
              },
            },
          },
        },
      },
    });

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      status: order.status,
      notes: order.notes,
      totalPrice: order.totalPrice,
      trackingId: order.trackingId,
      costumer: order.costumer,
      products: order.orderProducts.map(({ quantity, product }) => ({
        ...product,
        quantity,
      })),
    }));

    return formattedOrders.map((order) => new OrderEntity(order));
  }

  // async list(): Promise<OrderEntity[]> {
  //   const rawOrders = await this.prisma.$queryRaw<any[]>`
  //   SELECT o.id, c.id AS "clientId", c."name" AS "costumerName", p."id" AS "productId", p."name" AS "productName", op.quantity, o.status
  //   FROM orders o
  //   LEFT JOIN costumers c ON c.id = o."costumerId"
  //   INNER JOIN "orderProducts" op ON op."orderId" = o.id
  //   INNER JOIN products p ON p.id = op."productId"
  // `;

  //   const orders: OrderEntity[] = rawOrders.reduce((acc, row) => {
  //     let order = acc.find((order) => order.id === row.id);

  //     if (!order) {
  //       const costumer = row.clientId
  //         ? { id: row.clientId, name: row.costumerName }
  //         : null;

  //       order = {
  //         id: row.id,
  //         status: row.status,
  //         costumer: costumer,
  //         orderProducts: [],
  //       };

  //       acc.push(order);
  //     }

  //     order.orderProducts.push({
  //       productId: row.productId,
  //       productName: row.productName,
  //       quantity: row.quantity,
  //     });

  //     return acc;
  //   }, []);

  //   return orders;
  // }

  async retrieve(id: number): Promise<OrderEntity> {
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.orderProduct.deleteMany({
      where: {
        orderId: id,
      },
    });

    await this.prisma.order.delete({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, orderDTO: UpdateOrderDTO): Promise<OrderEntity> {
    await this.prisma.order.update({
      where: { id: id },
      data: orderDTO,
    });

    return this.findOne(id);
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.prisma.order.findUnique({
      where: { id: id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        notes: true,
        totalPrice: true,
        status: true,
        trackingId: true,
        costumer: true,
        orderProducts: {
          select: {
            quantity: true,
            product: {
              select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                name: true,
                price: true,
                description: true,
                pictures: true,
                category: true,
              },
            },
          },
        },
      },
    });

    const formattedOrder = {
      id: order.id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      status: order.status,
      totalPrice: order.totalPrice,
      notes: order.notes,
      trackingId: order.trackingId,
      costumer: order.costumer,
      products: order.orderProducts.map(({ quantity, product }) => ({
        ...product,
        quantity,
      })),
    };

    return new OrderEntity(formattedOrder);
  }
}
