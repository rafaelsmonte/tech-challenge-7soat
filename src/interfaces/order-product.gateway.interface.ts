import { OrderProduct } from 'src/entities/order-product.entity';

export interface OrderProductGateway {
  findByOrderId(orderId: number): Promise<OrderProduct[]>;
  create(orderProduct: OrderProduct): Promise<OrderProduct>;
  delete(id: number): Promise<void>;
}
