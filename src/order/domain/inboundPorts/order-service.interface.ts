import { OrderEntity } from '../model/order.entity';

export interface IOrderService {
  findAll(): OrderEntity[];
}
