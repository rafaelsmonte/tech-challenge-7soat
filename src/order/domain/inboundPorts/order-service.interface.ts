import { Order } from '../model/order';

export interface IOrderService {
  findAll(): Order[];
}
