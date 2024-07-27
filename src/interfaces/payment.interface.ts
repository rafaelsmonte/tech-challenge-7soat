import { Payment } from 'src/entities/payment.entity';

export interface IPayment {
  create(id: string, amount: number, payerEmail: string): Promise<Payment>;
}
