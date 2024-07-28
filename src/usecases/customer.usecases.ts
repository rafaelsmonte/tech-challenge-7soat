import { Customer } from 'src/entities/customer.entity';
import { CustomerAlreadyRegisteredError } from 'src/errors/customer-already-registered.error';
import { CustomerNotFoundError } from 'src/errors/customer-not-found.error';
import { ICustomerGateway } from 'src/interfaces/customer.gateway.interface';

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

    if (!customer) throw new CustomerNotFoundError('Customer not found');

    return customer;
  }

  static async findByTaxpayerRegistry(
    customerGateway: ICustomerGateway,
    taxpayerRegistry: string,
  ): Promise<Customer> {
    const customer = await customerGateway.findByTaxpayerRegistry(
      taxpayerRegistry,
    );

    if (!customer) throw new CustomerNotFoundError('Customer not found');

    return customer;
  }

  static async create(
    customerGateway: ICustomerGateway,
    name: string,
    taxpayerRegistry: string,
    email: string,
  ): Promise<Customer> {
    const customer = await customerGateway.findByTaxpayerRegistry(
      taxpayerRegistry,
    );

    if (customer)
      throw new CustomerAlreadyRegisteredError('Customer already registered');

    return await customerGateway.create(
      Customer.new(name, taxpayerRegistry, email),
    );
  }

  static async delete(
    customerGateway: ICustomerGateway,
    id: number,
  ): Promise<void> {
    const customer = await customerGateway.findById(id);

    if (!customer) throw new CustomerNotFoundError('Customer not found');

    await customerGateway.delete(id);
  }
}
