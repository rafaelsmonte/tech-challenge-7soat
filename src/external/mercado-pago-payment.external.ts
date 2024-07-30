import { IPayment } from '../interfaces/payment.interface';
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from 'mercadopago';
import { Payment } from '../entities/payment.entity';
import { PaymentError } from '../errors/payment.error';
import { createHmac } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export class MercadoPago implements IPayment {
  async create(
    amount: number,
    expirationDate: Date,
    payerEmail?: string,
  ): Promise<Payment> {
    try {
      const client = new MercadoPagoConfig({
        accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
      });
      const payment = new MercadoPagoPayment(client);

      const requestOptions = { idempotencyKey: uuidv4() };
      const body = {
        date_of_expiration: expirationDate.toISOString(),
        transaction_amount: amount,
        description: '',
        payment_method_id: 'pix',
        payer: {
          email: payerEmail ?? 'no_customer@stub.com',
        },
      };

      const paymentResponse = await payment.create({ body, requestOptions });

      const paymentId = paymentResponse?.id;

      const pixQrCode =
        paymentResponse?.point_of_interaction?.transaction_data?.qr_code;

      const pixQrCodeBase64 =
        paymentResponse?.point_of_interaction?.transaction_data?.qr_code_base64;

      if (!paymentId || !pixQrCode || !pixQrCodeBase64)
        throw new PaymentError('Failed to create payment');

      return new Payment(
        paymentId,
        amount,
        pixQrCode,
        pixQrCodeBase64,
        expirationDate,
        payerEmail,
      );
    } catch (error: any) {
      console.log(error);
      throw new PaymentError('Failed to create payment');
    }
  }

  async isPaymentApproved(paymentId: number): Promise<boolean> {
    try {
      const client = new MercadoPagoConfig({
        accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
      });
      const payment = new MercadoPagoPayment(client);

      const paymentResponse = await payment.get({
        id: paymentId,
      });

      return paymentResponse.status === 'approved';
    } catch (error) {
      throw new PaymentError('Failed to check payment status');
    }
  }
}
