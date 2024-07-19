import { OrderProduct } from '@entities/order-product.entity';

export interface OrderProductGateway {
  findByOrderId(id: number): Promise<OrderProduct[]>;
  create(
    orderId: number,
    productId: number,
    quantity: number,
  ): Promise<OrderProduct>;
  delete(id: number): Promise<void>;
}
