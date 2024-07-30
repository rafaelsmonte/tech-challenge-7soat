import { Payment } from '../entities/payment.entity';

export interface IPayment {
  create(amount: number, payerEmail?: string): Promise<Payment>;
  isPaymentApproved(paymentId: number): Promise<boolean>;
}
