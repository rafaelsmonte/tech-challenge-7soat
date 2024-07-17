import { Customer } from '@entities/customer.entity';

export interface ICustomerGateway {
  findAll(): Promise<Customer[] | null>;
  findByTaxpayerRegistry(taxpayerRegistry: string): Promise<Customer>;
  findById(id: number): Promise<Customer>;
  save(
    name: string,
    taxpayerRegistry: string,
    email: string,
  ): Promise<Customer>;
  delete(id: number): Promise<void>;
}
