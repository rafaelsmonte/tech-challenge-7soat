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
        trackingId: 1,
        status: OrderStatus.AWAITING,
      };

      const createdOrder = await this.prisma.order.create({
        data: orderData,
      });

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

        await this.prisma.orderProduct.create({ data: orderProductData });
      });

      return createdOrder;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(): Promise<OrderEntity[]> {
    const orders = await this.prisma.order.findMany({
      include: { Costumer: true, OrderProduct: true },
    });
    return orders.map((order) => new OrderEntity(order));
  }

  async delete(id: number): Promise<void> {
    await this.prisma.order.delete({ where: { id: id } });
  }

  async update(id: number, orderDTO: UpdateOrderDTO): Promise<OrderEntity> {
    return await this.prisma.order.update({
      where: { id: id },
      data: orderDTO,
    });
  }
}
