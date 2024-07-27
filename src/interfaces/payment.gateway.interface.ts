import { Payment } from 'src/entities/payment.entity';

export interface IPaymentGateway {
  create(payment: Payment): Promise<Payment>;
}
