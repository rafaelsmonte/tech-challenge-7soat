import { PaymentInterface } from 'src/interfaces/payment.interface';
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from 'mercadopago';

export class MercadoPago implements PaymentInterface {
  async create(id: string, amount: number, payerEmail: string): Promise<string> {
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
      const pixCode = paymentResponse?.point_of_interaction?.transaction_data?.qr_code;
      const pixCodeB64 = paymentResponse?.point_of_interaction?.transaction_data?.qr_code_base64;
      return JSON.stringify({
        "pixCode" : pixCode || "",
        "pixCodeB64" : pixCodeB64 || ""
      })
    } catch (error: any) {
      console.error('Payment creation failed:', error);
      return JSON.stringify({
        "error" : error || ""
      })
    }
  }
}




