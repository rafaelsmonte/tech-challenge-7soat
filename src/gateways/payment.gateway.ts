
import { Payment } from 'src/entities/payment.entity';
import { PaymentGatewayInterface} from 'src/interfaces/payment.gateway.interface';
import { PaymentInterface } from 'src/interfaces/payment.interface';

export class PaymentGateway implements PaymentGatewayInterface {
  constructor(private paymentMethod: PaymentInterface) {}

  public async create(payment : Payment): Promise<boolean> {
    return this.paymentMethod.create(payment.id,payment.amount,payment.payer)
    
  }


}
