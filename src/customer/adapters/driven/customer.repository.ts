import { Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/customer/domain/model/customer.entity';
import { ICustomerRepository } from 'src/customer/domain/outboundPorts/customer-repository.interface';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateCustomerDTO } from '../model/create-customer.dto';
import { UpdateCustomerDTO } from '../model/update-customer.dto';
import { Prisma } from '@prisma/client';
import {
  CustomerAlreadyRegisteredException,
  CustomerNotFoundHttpException,
} from 'src/common/exceptions/http/http-exception';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(customerDTO: CreateCustomerDTO): Promise<CustomerEntity> {
    try {
      return await this.prisma.customer.create({ data: customerDTO });
    } catch (exception) {
      if (
        exception instanceof Prisma.PrismaClientKnownRequestError &&
        exception.code === 'P2002'
      ) {
        throw new CustomerAlreadyRegisteredException();
      } else {
        console.error('Unexpected exception: ', exception);
        throw exception;
      }
    }
  }

  async list(): Promise<CustomerEntity[]> {
    const customers = await this.prisma.customer.findMany();

    if (!customers) {
      throw new CustomerNotFoundHttpException();
    }

    return customers.map((customer) => new CustomerEntity(customer));
  }

  async retrieve(id: number): Promise<CustomerEntity> {
    const customer = await this.prisma.customer.findUnique({
      where: { id: id },
    });

    if (!customer) {
      throw new CustomerNotFoundHttpException();
    }

    return new CustomerEntity(customer);
  }

  async retrieveByTaxpayerRegistry(
    taxpayerRegistry: string,
  ): Promise<CustomerEntity> {
    const customer = await this.prisma.customer.findUnique({
      where: { taxpayerRegistry: taxpayerRegistry },
    });

    if (!customer) {
      throw new CustomerNotFoundHttpException();
    }

    return new CustomerEntity(customer);
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.customer.delete({ where: { id: id } });
    } catch (exception) {
      if (
        exception instanceof Prisma.PrismaClientKnownRequestError &&
        exception.code === 'P2025'
      ) {
        throw new CustomerNotFoundHttpException();
      } else {
        console.log(exception);
        throw exception;
      }
    }
  }

  async update(
    id: number,
    customerDTO: UpdateCustomerDTO,
  ): Promise<CustomerEntity> {
    try {
      return await this.prisma.customer.update({
        where: { id: id },
        data: customerDTO,
      });
    } catch (exception) {
      if (
        exception instanceof Prisma.PrismaClientKnownRequestError &&
        exception.code === 'P2025'
      ) {
        throw new CustomerNotFoundHttpException();
      } else {
        console.error('Unexpected exception: ', exception);
        throw exception;
      }
    }
  }
}
