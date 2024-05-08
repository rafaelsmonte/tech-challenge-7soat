import { Injectable } from '@nestjs/common';
import { Order } from 'src/order/domain/model/order';
import { IOrderRepository } from 'src/order/domain/outboundPorts/order-repository.interface';

@Injectable()
export class OrderRepository implements IOrderRepository {
  findAll(): Order[] {
    throw new Error('Method not implemented.');
  }
}
