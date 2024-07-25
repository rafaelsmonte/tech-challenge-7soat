import { InvalidOrderError } from 'src/errors/invalid-order.error';

export class Payment {
  public readonly id: string;
  public readonly amount: number;
  public readonly payer: string;

  constructor(
    id: string,
    payer: string,
    amount: number,

  ) {
    this.id = id;
    this.amount = amount;
    this.payer = payer;
    this.validate();
  }

  static new(
    id: string,
    payer: string,
    amount: number,

  ): Payment {
    const now = new Date();
    return new Payment(
      id,
      payer,
      amount
    );
  }

  // TODO improve validations

  validate() {
   
  }
 
}
