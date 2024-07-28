import { Payment } from 'src/entities/payment.entity';
import { IPaymentGateway } from 'src/interfaces/payment.gateway.interface';
import { IPayment } from 'src/interfaces/payment.interface';
import { OrderStatus } from 'src/enum/order-status.enum';

export class PaymentGateway implements IPaymentGateway {
  constructor(private paymentMethod: IPayment) {}

  public async create(payment: Payment): Promise<Payment> {
    return this.paymentMethod.create(
      payment.getAmount(),
      payment.getPayerEmail(),
      payment.getExpirationDate(),
    );
  }

  public checkPaymentSource(
    dataID: string,
    xSignature: string | string[],
    xRequestId: string | string[],
  ): boolean {
    return this.paymentMethod.checkPaymentSource(
      dataID,
      xSignature,
      xRequestId,
    );
  }
  public async getPaymenteStatus(paymentId: number): Promise<OrderStatus>{
   return this.paymentMethod.getPaymenteStatus(paymentId)
  }
  public checkPaymentAction(action: string): boolean{
    return this.paymentMethod.checkPaymentAction(action)
  }

}
