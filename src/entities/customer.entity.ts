import { InvalidCustomerError } from '../errors/invalid-customer.error';

export class Customer {
  private id: number;
  private createdAt: Date;
  private updatedAt: Date;
  private accountId: string;

  constructor(id: number, createdAt: Date, updatedAt: Date, accountId: string) {
    this.setId(id);
    this.setCreatedAt(createdAt);
    this.setUpdatedAt(updatedAt);
    this.setAccountId(accountId);
  }

  static new(accountId: string): Customer {
    const now = new Date();
    return new Customer(0, now, now, accountId);
  }

  // getters
  public getId(): number {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getAccountId(): string {
    return this.accountId;
  }

  // setters
  public setId(id: number): void {
    this.id = id;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  public setAccountId(accountId: string): void {
    this.accountId = accountId;

    if (this.accountId.length === 0) {
      throw new InvalidCustomerError('accountId is invalid');
    }
  }
}
