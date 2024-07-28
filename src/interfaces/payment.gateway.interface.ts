import { Payment } from '../entities/payment.entity';

export interface IPaymentGateway {
  create(payment: Payment): Promise<Payment>;
  checkPaymentSource(
    dataID: any,
    xSignature: string | string[],
    xRequestId: string | string[],
  ): boolean;
}
