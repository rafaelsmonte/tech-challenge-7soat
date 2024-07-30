import { Customer } from 'src/entities/customer.entity';
import { Order } from '../entities/order.entity';
import { ProductWithQuantity } from './product-with-quantity.type';

export type OrderAndProducts = {
  order: Order;
  customer?: Customer;
  productsWithQuantity: ProductWithQuantity[];
};
