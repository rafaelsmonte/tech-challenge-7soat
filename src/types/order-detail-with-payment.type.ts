import { Customer } from 'src/entities/customer.entity';
import { Order } from '../entities/order.entity';
import { Payment } from '../entities/payment.entity';
import { ProductDetailWithQuantity } from './product-detail-with-quantity.type';

export type OrderDetailWithPayment = {
  order: Order;
  payment: Payment;
  customer?: Customer;
  productsDetailWithQuantity: ProductDetailWithQuantity[];
};
