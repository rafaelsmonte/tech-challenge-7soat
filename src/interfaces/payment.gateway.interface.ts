import { Payment } from '../entities/payment.entity';

export interface IPaymentGateway {
  create(payment: Payment): Promise<Payment>;
  isPaymentApproved(paymentId: number): Promise<boolean>;
}
