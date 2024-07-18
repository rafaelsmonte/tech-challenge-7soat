import { Order } from '@entities/order.entity';
import { OrderProduct } from 'src/types/order-product.type';

export interface IOrderGateway {
  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order>;
  create(
    orderProducts: OrderProduct[],
    notes: string,
    totalPrice: number,
    trackingId: string,
    status: string,
    customerId?: number,
  ): Promise<Order>;
  delete(id: number): Promise<void>;
}
