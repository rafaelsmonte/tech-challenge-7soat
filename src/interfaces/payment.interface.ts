import { Payment } from 'src/entities/payment.entity';

export interface IPayment {
  create(amount: number, payerEmail: string): Promise<Payment>;
  checkPaymentSource(
    dataID: any,
    xSignature: string | string[],
    xRequestId: string | string[],
  ): boolean;
}
