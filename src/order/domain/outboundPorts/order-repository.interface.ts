import { OrderEntity } from '../model/order.entity';

export interface IOrderRepository {
  findAll(): OrderEntity[];
}

export const IOrderRepository = Symbol('IOrderRepository');
