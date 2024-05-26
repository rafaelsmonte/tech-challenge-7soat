import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { OrderEntity } from 'src/order/domain/model/order.entity';
import { IOrderRepository } from 'src/order/domain/outboundPorts/order-repository.interface';
import { CreateOrderDTO } from '../model/create-order.dto';
import { UpdateOrderDTO } from '../model/update-order.dto';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import {
  CustomerNotFoundHttpException,
  OrderNotFoundHttpException,
  ProductNotFoundHttpException,
} from 'src/common/exceptions/http/http-exception';
import { Prisma } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async create(
    orderDTO: CreateOrderDTO,
    totalPrice: number,
  ): Promise<OrderEntity> {
    try {
      const createdOrder = await this.prisma.order.create({
        data: {
          customer: {
            ...(orderDTO.customerId !== undefined
              ? {
                  connect: {
                    id: orderDTO.customerId,
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
    } catch (exception) {
      if (
        exception instanceof Prisma.PrismaClientKnownRequestError &&
        exception.code === 'P2025'
      ) {
        if (
          exception.meta?.cause ===
          "No 'Customer' record(s) (needed to inline the relation on 'Order' record(s)) was found for a nested connect on one-to-many relation 'CustomerToOrder'."
        ) {
          throw new CustomerNotFoundHttpException();
        } else if (
          exception.meta?.cause ===
          "No 'Product' record(s) (needed to inline the relation on 'OrderProduct' record(s)) was found for a nested connect on one-to-many relation 'OrderProductToProduct'."
        ) {
          throw new ProductNotFoundHttpException();
        } else {
          this.logger.error('Unexpected exception: ', exception);
          throw exception;
        }
      } else {
        this.logger.error('Unexpected exception: ', exception);
        throw exception;
      }
    }
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
        customer: true,
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

    if (!orders || orders.length === 0) {
      throw new OrderNotFoundHttpException();
    }

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      status: order.status,
      notes: order.notes,
      totalPrice: order.totalPrice,
      trackingId: order.trackingId,
      customer: order.customer,
      products: order.orderProducts.map(({ quantity, product }) => ({
        ...product,
        quantity,
      })),
    }));

    return formattedOrders.map((order) => new OrderEntity(order));
  }

  async retrieve(id: number): Promise<OrderEntity> {
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    try {
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
    } catch (exception) {
      if (
        exception instanceof Prisma.PrismaClientKnownRequestError &&
        exception.code === 'P2025'
      ) {
        throw new OrderNotFoundHttpException();
      } else {
        this.logger.error('Unexpected exception: ', exception);
        throw exception;
      }
    }
  }

  async update(id: number, orderDTO: UpdateOrderDTO): Promise<OrderEntity> {
    try {
      await this.prisma.order.update({
        where: { id: id },
        data: orderDTO,
      });

      return this.findOne(id);
    } catch (exception) {
      if (
        exception instanceof Prisma.PrismaClientKnownRequestError &&
        exception.code === 'P2025'
      ) {
        throw new OrderNotFoundHttpException();
      } else {
        this.logger.error('Unexpected exception: ', exception);
        throw exception;
      }
    }
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
        customer: true,
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

    if (!order) {
      throw new OrderNotFoundHttpException();
    }

    const formattedOrder = {
      id: order.id,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      status: order.status,
      totalPrice: order.totalPrice,
      notes: order.notes,
      trackingId: order.trackingId,
      customer: order.customer,
      products: order.orderProducts.map(({ quantity, product }) => ({
        ...product,
        quantity,
      })),
    };

    return new OrderEntity(formattedOrder);
  }
}
