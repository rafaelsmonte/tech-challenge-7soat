import { Customer } from '@entities/customer.entity';

export interface CustomerGateway {
  findAll(): Promise<Customer[]>;
  findByTaxpayerRegistry(taxpayerRegistry: string): Promise<Customer | null>;
  findById(id: number): Promise<Customer | null>;
  save(customer: Customer): Promise<Customer>;
  delete(id: number): Promise<void>;
}
