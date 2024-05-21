import { CreateOrderDTO } from 'src/order/adapters/model/create-order.dto';
import { OrderEntity } from '../model/order.entity';
import { UpdateOrderDTO } from 'src/order/adapters/model/update-order.dto';

export interface IOrderService {
  list(): Promise<OrderEntity[]>;
  retrieve(id: number): Promise<OrderEntity>;
  create(customerDTO: CreateOrderDTO): Promise<OrderEntity>;
  delete(id: number): Promise<void>;
  update(id: number, customerDTO: UpdateOrderDTO): Promise<OrderEntity>;
}
