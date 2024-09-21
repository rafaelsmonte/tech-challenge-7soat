import { Customer } from '../entities/customer.entity';
import { CustomerNotFoundError } from '../errors/customer-not-found.error';
import { ICustomerGateway } from '../interfaces/customer.gateway.interface';

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

  static async findByAccountId(
    customerGateway: ICustomerGateway,
    accountId: string,
  ): Promise<Customer> {
    const customer = await customerGateway.findByAccountId(accountId);

    if (!customer) throw new CustomerNotFoundError('Customer not found');

    return customer;
  }

  static async findByAccountIdOrCreate(
    customerGateway: ICustomerGateway,
    accountId: string,
  ): Promise<Customer> {
    let customer = await customerGateway.findByAccountId(accountId);

    if (!customer) {
      customer = await this.create(customerGateway, accountId);
    }

    return customer;
  }

  static async create(
    customerGateway: ICustomerGateway,
    accountId: string,
  ): Promise<Customer> {
    return await customerGateway.create(Customer.new(accountId));
  }
}
