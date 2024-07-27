import { IPayment } from 'src/interfaces/payment.interface';
import { MercadoPagoConfig, Payment as MercadoPagoPayment } from 'mercadopago';
import { Payment } from 'src/entities/payment.entity';
import { PaymentError } from 'src/errors/payment.error';
import { createHmac } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export class MercadoPago implements IPayment {
  async create(
    amount: number,
    payerEmail: string,
  ): Promise<Payment> {
    try {
      const client = new MercadoPagoConfig({
        accessToken: process.env.ACCESS_TOKEN || '',
      });
      const payment = new MercadoPagoPayment(client);

      const requestOptions = { idempotencyKey: uuidv4() };
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
      
      const paymentId = String(paymentResponse?.id)
      return new Payment(paymentId, amount, payerEmail, pixQrCode, pixQrCodeBase64);
    } catch (error: any) {
      throw new PaymentError('Failed to create payment');
    }
  }
  checkPaymentSource(dataID:string,xSignature:string,xRequestId:string): boolean {
    const secret : string= process.env.MERCADO_PAGO_SECRET

    if (!xSignature || !xRequestId) {
      return false
    }
  
    const parts = xSignature.split(',');
  
    let ts: string | undefined;
    let hash: string | undefined;
  
    parts.forEach(part => {
      const [key, value] = part.split('=').map(str => str.trim());
      if (key === 'ts') {
        ts = value;
      } else if (key === 'v1') {
        hash = value;
      }
    });
    if (!ts || !hash) {
      return false
    }
    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;
    const hmac = createHmac('sha256', secret);
    hmac.update(manifest);
    const sha = hmac.digest('hex');
    console.log()
    if (sha === hash) 
      return true
    return false
  }

}
