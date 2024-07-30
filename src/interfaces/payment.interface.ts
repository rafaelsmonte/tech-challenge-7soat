import { Payment } from '../entities/payment.entity';

export interface IPayment {
  create(
    amount: number,
    expirationDate: Date,
    payerEmail?: string,
  ): Promise<Payment>;
  isPaymentApproved(paymentId: number): Promise<boolean>;
}
