export class Payment {
  private id: string;
  private amount: number;
  private payerEmail: string;
  private pixQrCode: string;
  private pixQrCodeBase64;

  constructor(
    id: string,
    amount: number,
    payerEmail: string,
    pixQrCode: string,
    pixQrCodeBase64: string,
  ) {
    this.setId(id);
    this.setAmount(amount);
    this.setPayerEmail(payerEmail);
    this.setPixQrCode(pixQrCode);
    this.setPixQrCodeBase64(pixQrCodeBase64);
  }

  static new(id: string, amount: number, payerEmail: string): Payment {
    return new Payment(id, amount, payerEmail, '', '');
  }

  // getters
  public getId(): string {
    return this.id;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getPayerEmail(): string {
    return this.payerEmail;
  }

  public getPixQrCode(): string {
    return this.pixQrCode;
  }

  public getPixQrCodeBase64(): string {
    return this.pixQrCodeBase64;
  }

  // setters
  public setId(id: string): void {
    this.id = id;
  }

  public setAmount(amount: number): void {
    this.amount = amount;
  }

  public setPayerEmail(payerEmail: string): void {
    this.payerEmail = payerEmail;
  }

  public setPixQrCode(pixQrCode: string): void {
    this.pixQrCode = pixQrCode;
  }

  public setPixQrCodeBase64(pixQrCodeBase64: string): void {
    this.pixQrCodeBase64 = pixQrCodeBase64;
  }

  // TODO improve validations
}
