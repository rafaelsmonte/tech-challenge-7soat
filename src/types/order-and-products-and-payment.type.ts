import { Order } from 'src/entities/order.entity';
import { ProductAndQuantity } from './product-and-quantity.type';
import { Payment } from 'src/entities/payment.entity';

export type OrderAndProductsAndPayment = {
  order: Order;
  productsAndQuantity: ProductAndQuantity[];
  payment: Payment;
};
