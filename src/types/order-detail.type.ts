import { Customer } from 'src/entities/customer.entity';
import { Order } from '../entities/order.entity';
import { ProductDetailWithQuantity } from './product-detail-with-quantity.type';

export type OrderDetail = {
  order: Order;
  customer?: Customer;
  productsDetailWithQuantity: ProductDetailWithQuantity[];
};
