import { CreateCustomerDTO } from 'src/customer/adapters/model/create-customer.dto';
import { CustomerEntity } from '../model/customer.entity';
import { UpdateCustomerDTO } from 'src/customer/adapters/model/update-customer.dto';
import { CustomerFiltersDTO } from 'src/customer/adapters/model/customer-filters.dto';

export interface ICustomerRepository {
  list(customerFiltersDTO: CustomerFiltersDTO): Promise<CustomerEntity[]>;
  retrieve(id: number): Promise<CustomerEntity>;
  retrieveByTaxpayerRegistry(taxpayerRegistry: string): Promise<CustomerEntity>;
  create(customerDTO: CreateCustomerDTO): Promise<CustomerEntity>;
  delete(id: number): Promise<void>;
  update(id: number, customerDTO: UpdateCustomerDTO): Promise<CustomerEntity>;
}

export const ICustomerRepository = Symbol('ICustomerRepository');
