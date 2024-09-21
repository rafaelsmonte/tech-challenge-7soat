import { Payment } from '../entities/payment.entity';

export interface IPayment {
  create(amount: number): Promise<Payment>;
  isPaymentApproved(paymentId: number): Promise<boolean>;
}
