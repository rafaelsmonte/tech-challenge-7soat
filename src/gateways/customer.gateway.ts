import { Customer } from '../entities/customer.entity';
import { ICustomerGateway } from '../interfaces/customer.gateway.interface';
import { IDatabase } from '../interfaces/database.interface';

export class CustomerGateway implements ICustomerGateway {
  constructor(private database: IDatabase) {}

  public async findAll(): Promise<Customer[]> {
    return this.database.findAllCustomers();
  }

  public async findByAccountId(accountId: string): Promise<Customer | null> {
    return this.database.findCustomerByAccountId(accountId);
  }

  public async findById(id: number): Promise<Customer | null> {
    return this.database.findCustomerById(id);
  }

  public async create(customer: Customer): Promise<Customer> {
    return this.database.saveCustomer(customer);
  }
}
