import { InvalidCustomerError } from 'src/errors/invalid-customer.error';

export class Customer {
  public readonly id: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly name: string;
  public readonly taxpayerRegistry: string;
  public readonly email: string;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    taxpayerRegistry: string,
    email: string,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.taxpayerRegistry = taxpayerRegistry;
    this.email = email;

    this.validate();
  }

  static new(name: string, taxpayerRegistry: string, email: string): Customer {
    const now = new Date();
    return new Customer(0, now, now, name, taxpayerRegistry, email);
  }

  // TODO improve validations

  validate() {
    if (this.name.length > 50) {
      throw new InvalidCustomerError('Name size must be lesser than 50');
    }

    if (this.taxpayerRegistry.length > 50) {
      throw new InvalidCustomerError(
        'TaxpayerRegistry size must be lesser than 50',
      );
    }

    if (this.email.length > 50) {
      throw new InvalidCustomerError('Email size must be lesser than 50');
    }
  }
}
