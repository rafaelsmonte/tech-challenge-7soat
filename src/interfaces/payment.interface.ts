

export interface PaymentInterface {
  create(id: string, amout: number,  payerEmail: string): Promise<boolean>;


}
