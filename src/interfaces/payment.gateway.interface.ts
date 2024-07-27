import { Payment } from 'src/entities/payment.entity';

export interface IPaymentGateway {
  create(payment: Payment): Promise<Payment>;
  checkSource(dataID:string,xSignature:string | string[],xRequestId:string | string[]): boolean;
}  
