import { CustomerAdapter } from 'src/adapters/customer.adapter';
import { CustomerGateway } from 'src/gateways/customer.gateway';
import { IDatabase } from 'src/interfaces/database.interface';
import { CustomerUseCases } from 'src/usecases/customer.usecases';

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

  static async findByTaxpayerRegistry(
    database: IDatabase,
    taxpayerRegistry: string,
  ): Promise<string> {
    const customerGateway = new CustomerGateway(database);
    const customer = await CustomerUseCases.findByTaxpayerRegistry(
      customerGateway,
      taxpayerRegistry,
    );
    const customerJson = CustomerAdapter.adaptJson(customer);
    return customerJson;
  }

  static async create(
    database: IDatabase,
    name: string,
    taxpayerRegistry: string,
    email: string,
  ): Promise<string> {
    const customerGateway = new CustomerGateway(database);
    const newCustomer = await CustomerUseCases.create(
      customerGateway,
      name,
      taxpayerRegistry,
      email,
    );
    const customerJson = CustomerAdapter.adaptJson(newCustomer);
    return customerJson;
  }

  static async delete(database: IDatabase, id: number): Promise<void> {
    const customerGateway = new CustomerGateway(database);
    await CustomerUseCases.delete(customerGateway, id);
  }
}
