import { Customer } from 'src/entities/customer.entity';

export interface CustomerGateway {
  findAll(): Promise<Customer[]>;
  findByTaxpayerRegistry(taxpayerRegistry: string): Promise<Customer | null>;
  findById(id: number): Promise<Customer | null>;
  create(customer: Customer): Promise<Customer>;
  delete(id: number): Promise<void>;
}
