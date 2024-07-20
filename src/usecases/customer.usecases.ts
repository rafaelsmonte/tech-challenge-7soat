import { Customer } from '@entities/customer.entity';
import { CustomerGateway } from '@interfaces/customer.gateway.interface';

// TODO handle errors

export class CustomerUseCases {
  static async findAll(customerGateway: CustomerGateway): Promise<Customer[]> {
    const customers = await customerGateway.findAll();
    return customers;
  }

  static async findById(
    customerGateway: CustomerGateway,
    id: number,
  ): Promise<Customer> {
    const customer = await customerGateway.findById(id);

    if (!customer) throw Error('Customer not found');

    return customer;
  }

  static async findByTaxpayerRegistry(
    customerGateway: CustomerGateway,
    taxpayerRegistry: string,
  ): Promise<Customer> {
    const customer = await customerGateway.findByTaxpayerRegistry(
      taxpayerRegistry,
    );

    if (!customer) throw Error('Customer not found');

    return customer;
  }

  static async create(
    customerGateway: CustomerGateway,
    name: string,
    email: string,
    taxpayerRegistry: string,
  ): Promise<Customer> {
    const customer = await customerGateway.findByTaxpayerRegistry(
      taxpayerRegistry,
    );

    if (customer) throw Error('Customer already registered');

    return await customerGateway.save(
      Customer.new(name, email, taxpayerRegistry),
    );
  }

  static async delete(
    customerGateway: CustomerGateway,
    id: number,
  ): Promise<void> {
    await customerGateway.delete(id);
  }
}
