import { Order } from '../entities/order.entity';
import { ProductAndQuantity } from './product-and-quantity.type';

export type OrderAndProducts = {
  order: Order;
  productsAndQuantity: ProductAndQuantity[];
};
