import { Customer } from 'src/entities/customer.entity';
import { Order } from '../entities/order.entity';
import { Payment } from '../entities/payment.entity';
import { ProductWithQuantity } from './product-with-quantity.type';

export type OrderAndProductsAndPayment = {
  order: Order;
  payment: Payment;
  customer?: Customer;
  productsWithQuantity: ProductWithQuantity[];
};
