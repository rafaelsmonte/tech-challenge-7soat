import { IPayment } from 'src/interfaces/payment.interface';
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from 'mercadopago';
import { Payment } from 'src/entities/payment.entity';
import { PaymentError } from 'src/errors/payment.error';

export class MercadoPago implements IPayment {
  async create(
    id: string,
    amount: number,
    payerEmail: string,
  ): Promise<Payment> {
    try {
      const client = new MercadoPagoConfig({
        accessToken: process.env.ACCESS_TOKEN || '',
      });
      const payment = new MercadoPagoPayment(client);

      const requestOptions = { idempotencyKey: id };
      const body = {
        transaction_amount: amount,
        description: '',
        payment_method_id: 'pix',
        payer: {
          email: payerEmail,
        },
      };

      const paymentResponse = await payment.create({ body, requestOptions });

      const pixQrCode =
        paymentResponse?.point_of_interaction?.transaction_data?.qr_code;

      if (!pixQrCode) throw new PaymentError('Failed to create payment');

      const pixQrCodeBase64 =
        paymentResponse?.point_of_interaction?.transaction_data?.qr_code_base64;

      if (!pixQrCodeBase64) throw new PaymentError('Failed to create payment');

      return new Payment(id, amount, payerEmail, pixQrCode, pixQrCodeBase64);
    } catch (error: any) {
      throw new PaymentError('Failed to create payment');
    }
  }
}
