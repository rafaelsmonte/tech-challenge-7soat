export class Payment {
  private id: number;
  private amount: number;
  private payerEmail?: string;
  private pixQrCode: string;
  private pixQrCodeBase64: string;

  constructor(
    id: number,
    amount: number,
    pixQrCode: string,
    pixQrCodeBase64: string,
    payerEmail?: string,
  ) {
    this.setId(id);
    this.setAmount(amount);
    this.setPixQrCode(pixQrCode);
    this.setPixQrCodeBase64(pixQrCodeBase64);
    this.setPayerEmail(payerEmail);
  }

  static new(amount: number, payerEmail?: string): Payment {
    return new Payment(0, amount, '', '', payerEmail);
  }

  // getters
  public getId(): number {
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
  public setId(id: number): void {
    this.id = id;
  }

  public setAmount(amount: number): void {
    this.amount = amount;
  }

  public setPayerEmail(payerEmail?: string): void {
    this.payerEmail = payerEmail;
  }

  public setPixQrCode(pixQrCode: string): void {
    this.pixQrCode = pixQrCode;
  }

  public setPixQrCodeBase64(pixQrCodeBase64: string): void {
    this.pixQrCodeBase64 = pixQrCodeBase64;
  }
}
