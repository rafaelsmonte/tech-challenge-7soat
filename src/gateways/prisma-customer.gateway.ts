import { Customer } from 'src/entities/customer.entity';
import { CustomerGateway } from 'src/interfaces/customer.gateway.interface';
import { Database } from 'src/interfaces/database.interface';

export class PrismaCustomerGateway implements CustomerGateway {
  constructor(private database: Database) {}

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
