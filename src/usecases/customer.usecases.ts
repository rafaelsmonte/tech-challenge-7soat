import { Customer } from 'src/entities/customer.entity';
import { CustomerAlreadyRegisteredError } from 'src/errors/customer-already-registered.error';
import { CustomerNotFoundError } from 'src/errors/customer-not-found.error';
import { CustomerGateway } from 'src/interfaces/customer.gateway.interface';

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

    if (!customer) throw new CustomerNotFoundError('Customer not found');

    return customer;
  }

  static async findByTaxpayerRegistry(
    customerGateway: CustomerGateway,
    taxpayerRegistry: string,
  ): Promise<Customer> {
    const customer = await customerGateway.findByTaxpayerRegistry(
      taxpayerRegistry,
    );

    if (!customer) throw new CustomerNotFoundError('Customer not found');

    return customer;
  }

  static async create(
    customerGateway: CustomerGateway,
    name: string,
    taxpayerRegistry: string,
    email: string,
  ): Promise<Customer> {
    const customer = await customerGateway.findByTaxpayerRegistry(
      taxpayerRegistry,
    );

    if (customer)
      throw new CustomerAlreadyRegisteredError('Customer already registered');

    return await customerGateway.save(
      Customer.new(name, taxpayerRegistry, email),
    );
  }

  static async delete(
    customerGateway: CustomerGateway,
    id: number,
  ): Promise<void> {
    const customer = await customerGateway.findById(id);

    if (!customer) throw new CustomerNotFoundError('Customer not found');

    await customerGateway.delete(id);
  }
}
