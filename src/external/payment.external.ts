import { PaymentInterface } from 'src/interfaces/payment.interface';
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from 'mercadopago';

export class MercadoPago implements PaymentInterface {
  async create(id: string, amount: number, payerEmail: string): Promise<boolean> {
    try {
      const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN || "" });
      const payment = new MercadoPagoPayment(client);
      const requestOptions = { idempotencyKey: id };
      const body = { 
        transaction_amount: amount,
        description: "",
        payment_method_id: 'pix',
        payer: {
          email: payerEmail,
        },
      };
      const paymentResponse = await payment.create({ body, requestOptions });
      if(paymentResponse.api_response.status == 201)
        return true;
      return false
    } catch (error) {
      console.error('Payment creation failed:', error);
      return false;
    }
  }
}
