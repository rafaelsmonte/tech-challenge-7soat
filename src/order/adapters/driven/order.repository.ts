import { Injectable } from '@nestjs/common';
import { OrderEntity } from 'src/order/domain/model/order.entity';
import { IOrderRepository } from 'src/order/domain/outboundPorts/order-repository.interface';

@Injectable()
export class OrderRepository implements IOrderRepository {
  findAll(): OrderEntity[] {
    throw new Error('Method not implemented.');
  }
}
