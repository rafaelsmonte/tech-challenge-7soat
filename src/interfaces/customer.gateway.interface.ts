import { Customer } from '../entities/customer.entity';

export interface ICustomerGateway {
  findByAccountId(accountId: string): Promise<Customer | null>;
  findById(id: number): Promise<Customer | null>;
  create(customer: Customer): Promise<Customer>;
}
