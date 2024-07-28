import { Order } from 'src/entities/order.entity';

export interface IOrderGateway {
  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order | null>;
  findByPaymentId(paymentId: number): Promise<Order | null>;
  create(order: Order): Promise<Order>;
  updateStatus(order: Order): Promise<Order>;
  delete(id: number): Promise<void>;
}
