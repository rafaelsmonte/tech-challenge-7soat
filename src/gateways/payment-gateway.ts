import { Payment } from 'src/entities/payment.entity';
import { IPaymentGateway } from 'src/interfaces/payment.gateway.interface';
import { IPayment } from 'src/interfaces/payment.interface';

export class PaymentGateway implements IPaymentGateway {
  constructor(private paymentMethod: IPayment) {}

  public async create(payment: Payment): Promise<Payment> {
    return this.paymentMethod.create(
      payment.getAmount(),
      payment.getPayerEmail(),
    );
  }
  public checkSource(dataID:string,xSignature:string | string[],xRequestId:string | string[]):boolean {
    return this.paymentMethod.checkPaymentSource(dataID,xSignature,xRequestId)
  }
}
