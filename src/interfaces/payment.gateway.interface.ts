import { Payment } from "src/entities/payment.entity";


export interface PaymentGatewayInterface {
  create(payment: Payment): Promise<String>;

}
