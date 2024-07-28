import { Customer } from 'src/entities/customer.entity';
import { ICustomerGateway } from 'src/interfaces/customer.gateway.interface';
import { IDatabase } from 'src/interfaces/database.interface';

export class CustomerGateway implements ICustomerGateway {
  constructor(private database: IDatabase) {}

  public async findAll(): Promise<Customer[]> {
    return this.database.findAllCustomers();
  }

  public async findByTaxpayerRegistry(
    taxpayerRegistry: string,
  ): Promise<Customer | null> {
    return this.database.findCustomerByTaxpayerRegistry(taxpayerRegistry);
  }

  public async findById(id: number): Promise<Customer | null> {
    return this.database.findCustomerById(id);
  }

  public async create(customer: Customer): Promise<Customer> {
    return this.database.saveCustomer(customer);
  }

  public async delete(id: number): Promise<void> {
    return this.database.deleteCustomer(id);
  }
}
