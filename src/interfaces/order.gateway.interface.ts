import { Order } from '@entities/order.entity';
import { ProductAndQuantity } from 'src/types/product-and-quantity.type';

export interface OrderGateway {
  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order>;
  create(
    productsAndQuantity: ProductAndQuantity[],
    notes: string,
    totalPrice: number,
    trackingId: string,
    status: string,
    customerId?: number,
  ): Promise<Order>;
  delete(id: number): Promise<void>;
}
