import { Order } from '@entities/order.entity';

export interface IOrderGateway {
  findAll(): Promise<Order | null>;
}
