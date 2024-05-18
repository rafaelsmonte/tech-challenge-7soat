import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../outboundPorts/order-repository.interface';
import { IOrderService } from './order-service.interface';
import { OrderEntity } from '../model/order.entity';
import { CreateOrderDTO } from 'src/order/adapters/model/create-order.dto';
import { UpdateOrderDTO } from 'src/order/adapters/model/update-order.dto';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}
  async create(orderDTO: CreateOrderDTO): Promise<OrderEntity> {
    return await this.orderRepository.create(orderDTO);
  }

  async list(): Promise<OrderEntity[]> {
    return await this.orderRepository.list();
  }

  async retrieve(id: number): Promise<OrderEntity> {
    return await this.orderRepository.retrieve(id);
  }

  async delete(id: number): Promise<void> {
    return await this.orderRepository.delete(id);
  }

  async update(id: number, orderDTO: UpdateOrderDTO): Promise<OrderEntity> {
    return await this.orderRepository.update(id, orderDTO);
  }
}
