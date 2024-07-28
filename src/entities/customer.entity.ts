import { InvalidCustomerError } from '../errors/invalid-customer.error';

export class Customer {
  private id: number;
  private createdAt: Date;
  private updatedAt: Date;
  private name: string;
  private taxpayerRegistry: string;
  private email: string;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    taxpayerRegistry: string,
    email: string,
  ) {
    this.setId(id);
    this.setCreatedAt(createdAt);
    this.setUpdatedAt(updatedAt);
    this.setName(name);
    this.setTaxpayerRegistry(taxpayerRegistry);
    this.setEmail(email);
  }

  static new(name: string, taxpayerRegistry: string, email: string): Customer {
    const now = new Date();
    return new Customer(0, now, now, name, taxpayerRegistry, email);
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

  public getName(): string {
    return this.name;
  }

  public getTaxpayerRegistry(): string {
    return this.taxpayerRegistry;
  }

  public getEmail(): string {
    return this.email;
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

  public setName(name: string): void {
    this.name = name;

    if (this.name.length > 50) {
      throw new InvalidCustomerError('Name size must be lesser than 50');
    }
  }

  public setTaxpayerRegistry(taxpayerRegistry: string): void {
    this.taxpayerRegistry = taxpayerRegistry;

    if (this.taxpayerRegistry.length > 50) {
      throw new InvalidCustomerError(
        'TaxpayerRegistry size must be lesser than 50',
      );
    }
  }

  public setEmail(email: string): void {
    this.email = email;

    if (this.email.length > 50) {
      throw new InvalidCustomerError('Email size must be lesser than 50');
    }
  }
}
