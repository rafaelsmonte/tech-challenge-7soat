import { Payment } from '../entities/payment.entity';

export interface IPayment {
  create(
    amount: number,
    expirationDate: Date,
    payerEmail?: string,
  ): Promise<Payment>;
  checkPaymentSource(
    dataID: any,
    xSignature: string | string[],
    xRequestId: string | string[],
  ): boolean;
  checkPaymentAction(action: string): boolean;
  isPaymentApproved(paymentId: number): Promise<boolean>;
}
