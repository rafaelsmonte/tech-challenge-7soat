import { Module } from '@nestjs/common';
import { CustomerController } from './adapters/driving/customer.controller';
import { CustomerService } from './domain/inboundPorts/customer.service';
import { ICustomerRepository } from './domain/outboundPorts/customer-repository.interface';
import { CustomerRepository } from './adapters/driven/customer.repository';

@Module({
  controllers: [CustomerController],
  providers: [
    CustomerService,
    {
      provide: ICustomerRepository,
      useClass: CustomerRepository,
    },
  ],
})
export class CustomerModule {}
