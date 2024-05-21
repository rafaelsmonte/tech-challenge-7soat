import { Inject, Injectable } from '@nestjs/common';
import { ICustomerService } from './customer-service.interface';
import { ICustomerRepository } from '../outboundPorts/customer-repository.interface';
import { CustomerEntity } from '../model/customer.entity';
import { CreateCustomerDTO } from 'src/customer/adapters/model/create-customer.dto';
import { UpdateCustomerDTO } from 'src/customer/adapters/model/update-customer.dto';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async create(customerDTO: CreateCustomerDTO): Promise<CustomerEntity> {
    return await this.customerRepository.create(customerDTO);
  }

  async list(): Promise<CustomerEntity[]> {
    return await this.customerRepository.list();
  }

  async retrieve(id: number): Promise<CustomerEntity> {
    return await this.customerRepository.retrieve(id);
  }

  async retrieveByTaxpayerRegistry(
    taxpayerRegistry: string,
  ): Promise<CustomerEntity> {
    return await this.customerRepository.retrieveByTaxpayerRegistry(
      taxpayerRegistry,
    );
  }

  async delete(id: number): Promise<void> {
    return await this.customerRepository.delete(id);
  }

  async update(
    id: number,
    customerDTO: UpdateCustomerDTO,
  ): Promise<CustomerEntity> {
    return await this.customerRepository.update(id, customerDTO);
  }
}
