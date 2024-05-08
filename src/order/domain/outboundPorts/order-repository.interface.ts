import { Order } from '../model/order';

export interface IOrderRepository {
  findAll(): Order[];
}

export const IOrderRepository = Symbol('IOrderRepository');
