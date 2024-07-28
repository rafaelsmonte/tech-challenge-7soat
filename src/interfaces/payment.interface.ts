import { Payment } from 'src/entities/payment.entity';
import { OrderStatus } from 'src/enum/order-status.enum';

export interface IPayment {
  create(amount: number, payerEmail: string, expirationDate: Date): Promise<Payment>;
  checkPaymentSource(
    dataID: any,
    xSignature: string | string[],
    xRequestId: string | string[],
  ): boolean;
  checkPaymentAction(action: string): boolean;
  getPaymenteStatus(paymentId: number): Promise<OrderStatus>;
}
