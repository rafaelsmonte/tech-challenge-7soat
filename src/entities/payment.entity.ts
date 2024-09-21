export class Payment {
  private id: number;
  private amount: number;
  private pixQrCode: string;
  private pixQrCodeBase64: string;

  constructor(
    id: number,
    amount: number,
    pixQrCode: string,
    pixQrCodeBase64: string,
  ) {
    this.setId(id);
    this.setAmount(amount);
    this.setPixQrCode(pixQrCode);
    this.setPixQrCodeBase64(pixQrCodeBase64);
  }

  static new(amount: number): Payment {
    return new Payment(0, amount, '', '');
  }

  // getters
  public getId(): number {
    return this.id;
  }

  public getAmount(): number {
    return this.amount;
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

  public setPixQrCode(pixQrCode: string): void {
    this.pixQrCode = pixQrCode;
  }

  public setPixQrCodeBase64(pixQrCodeBase64: string): void {
    this.pixQrCodeBase64 = pixQrCodeBase64;
  }
}
