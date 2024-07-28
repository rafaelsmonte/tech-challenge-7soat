import { Order } from '../entities/order.entity';
import { ProductAndQuantity } from './product-and-quantity.type';
import { Payment } from '../entities/payment.entity';

export type OrderAndProductsAndPayment = {
  order: Order;
  productsAndQuantity: ProductAndQuantity[];
  payment: Payment;
};
