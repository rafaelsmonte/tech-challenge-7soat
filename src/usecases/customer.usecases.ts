import { Customer } from '@entities/customer.entity';
import { ICustomerGateway } from '@interfaces/customer.gateway.interface';

export class CustomerUseCases {
  static async findAll(customerGateway: ICustomerGateway): Promise<Customer[]> {
    const customers = await customerGateway.findAll();
    return customers;
  }

  static async findById(
    customerGateway: ICustomerGateway,
    id: number,
  ): Promise<Customer> {
    const customer = await customerGateway.findById(id);
    return customer;
  }

  static async findByTaxpayerRegistry(
    customerGateway: ICustomerGateway,
    taxpayerRegistry: string,
  ): Promise<Customer> {
    const customer = await customerGateway.findByTaxpayerRegistry(
      taxpayerRegistry,
    );
    return customer;
  }

  static async create(
    customerGateway: ICustomerGateway,
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
    customerGateway: ICustomerGateway,
    id: number,
  ): Promise<void> {
    await customerGateway.delete(id);
  }
}
