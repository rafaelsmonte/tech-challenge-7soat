import { Payment } from '../entities/payment.entity';

export interface IPaymentGateway {
  create(payment: Payment): Promise<Payment>;
  checkPaymentSource(
    dataID: any,
    xSignature: string | string[],
    xRequestId: string | string[],
    action: string,
  ): boolean;
  checkPaymentAction(action: string): boolean;
  isPaymentApproved(paymentId: number): Promise<boolean>;
}
