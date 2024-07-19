import { Customer } from '@entities/customer.entity';
import { CustomerGateway } from '@interfaces/customer.gateway.interface';

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
    return customer;
  }

  static async findByTaxpayerRegistry(
    customerGateway: CustomerGateway,
    taxpayerRegistry: string,
  ): Promise<Customer> {
    const customer = await customerGateway.findByTaxpayerRegistry(
      taxpayerRegistry,
    );
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

    if (customer !== null) return Promise.reject('Customer already registered'); // TODO handle error

    return await customerGateway.save(name, taxpayerRegistry, email);
  }

  static async delete(
    customerGateway: CustomerGateway,
    id: number,
  ): Promise<void> {
    await customerGateway.delete(id);
  }
}
