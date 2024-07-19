import { IDatabase } from '@interfaces/database.interface';
import { CustomerUseCases } from '@usecases/customer.usecases';
import { CustomerAdapter } from 'src/adapters/customer.adapter';
import { PrismaCustomerGateway } from 'src/gateways/prisma-customer.gateway';

export class CustomerController {
  static async findAll(database: IDatabase): Promise<string> {
    const customerGateway = new PrismaCustomerGateway(database);
    const customers = await CustomerUseCases.findAll(customerGateway);
    const customersJson = CustomerAdapter.adaptArrayJson(customers);
    return customersJson;
  }

  static async findById(database: IDatabase, id: number): Promise<string> {
    const customerGateway = new PrismaCustomerGateway(database);
    const customer = await CustomerUseCases.findById(customerGateway, id);
    const customerJson = CustomerAdapter.adaptJson(customer);
    return customerJson;
  }

  static async findByTaxpayerRegistry(
    database: IDatabase,
    taxpayerRegistry: string,
  ): Promise<string> {
    const customerGateway = new PrismaCustomerGateway(database);
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
    const customerGateway = new PrismaCustomerGateway(database);
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
    const customerGateway = new PrismaCustomerGateway(database);
    await CustomerUseCases.delete(customerGateway, id);
  }

  // TODO implement update flow
}
