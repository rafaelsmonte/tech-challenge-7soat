import { OrderProduct } from '../entities/order-product.entity';

export interface IOrderProductGateway {
  findByOrderId(orderId: number): Promise<OrderProduct[]>;
  create(orderProduct: OrderProduct): Promise<OrderProduct>;
  delete(id: number): Promise<void>;
}
