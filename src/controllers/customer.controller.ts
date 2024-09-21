import { CustomerAdapter } from '../adapters/customer.adapter';
import { CustomerGateway } from '../gateways/customer.gateway';
import { IDatabase } from '../interfaces/database.interface';
import { CustomerUseCases } from '../usecases/customer.usecases';

export class CustomerController {
  static async findAll(database: IDatabase): Promise<string> {
    const customerGateway = new CustomerGateway(database);
    const customers = await CustomerUseCases.findAll(customerGateway);
    const customersJson = CustomerAdapter.adaptArrayJson(customers);
    return customersJson;
  }

  static async findById(database: IDatabase, id: number): Promise<string> {
    const customerGateway = new CustomerGateway(database);
    const customer = await CustomerUseCases.findById(customerGateway, id);
    const customerJson = CustomerAdapter.adaptJson(customer);
    return customerJson;
  }

  static async findByAccountId(
    database: IDatabase,
    accountId: string,
  ): Promise<string> {
    const customerGateway = new CustomerGateway(database);
    const customer = await CustomerUseCases.findByAccountId(
      customerGateway,
      accountId,
    );
    const customerJson = CustomerAdapter.adaptJson(customer);
    return customerJson;
  }

  static async create(database: IDatabase, accountId: string): Promise<string> {
    const customerGateway = new CustomerGateway(database);
    const newCustomer = await CustomerUseCases.create(
      customerGateway,
      accountId,
    );
    const customerJson = CustomerAdapter.adaptJson(newCustomer);
    return customerJson;
  }
}
