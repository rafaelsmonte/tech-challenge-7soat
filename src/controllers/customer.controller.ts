import { CustomerAdapter } from 'src/adapters/customer.adapter';
import { PrismaCustomerGateway } from 'src/gateways/prisma-customer.gateway';
import { Database } from 'src/interfaces/database.interface';
import { CustomerUseCases } from 'src/usecases/customer.usecases';

export class CustomerController {
  static async findAll(database: Database): Promise<string> {
    const customerGateway = new PrismaCustomerGateway(database);
    const customers = await CustomerUseCases.findAll(customerGateway);
    const customersJson = CustomerAdapter.adaptArrayJson(customers);
    return customersJson;
  }

  static async findById(database: Database, id: number): Promise<string> {
    const customerGateway = new PrismaCustomerGateway(database);
    const customer = await CustomerUseCases.findById(customerGateway, id);
    const customerJson = CustomerAdapter.adaptJson(customer);
    return customerJson;
  }

  static async findByTaxpayerRegistry(
    database: Database,
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
    database: Database,
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

  static async delete(database: Database, id: number): Promise<void> {
    const customerGateway = new PrismaCustomerGateway(database);
    await CustomerUseCases.delete(customerGateway, id);
  }

  // TODO implement update flow
}
