import { CreateOrderDTO } from 'src/order/adapters/model/create-order.dto';
import { OrderEntity } from '../model/order.entity';
import { UpdateOrderDTO } from 'src/order/adapters/model/update-order.dto';

export interface IOrderService {
  findAll(): Promise<OrderEntity[]>;
  create(costumerDTO: CreateOrderDTO): Promise<OrderEntity>;
  delete(id: number): Promise<void>;
  update(id: number, costumerDTO: UpdateOrderDTO): Promise<OrderEntity>;
}
