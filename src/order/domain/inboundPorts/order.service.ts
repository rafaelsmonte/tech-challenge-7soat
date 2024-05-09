import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../outboundPorts/order-repository.interface';
import { IOrderService } from './order-service.interface';
import { Order } from '../model/order';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}
  findAll(): Order[] {
    throw new Error('Method not implemented.');
  }
}
