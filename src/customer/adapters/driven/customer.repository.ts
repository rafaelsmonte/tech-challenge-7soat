import { Inject, Injectable, Logger } from '@nestjs/common';
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
import { CustomerFiltersDTO } from '../model/customer-filters.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

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
        this.logger.error('Unexpected exception: ', exception);
        throw exception;
      }
    }
  }

  async list(
    customerFiltersDTO: CustomerFiltersDTO,
  ): Promise<CustomerEntity[]> {
    const { name, email, taxpayerRegistry } = customerFiltersDTO;

    const customers = await this.prisma.customer.findMany({
      where: {
        ...(name ? { name: { contains: name, mode: 'insensitive' } } : {}),
        ...(email ? { email: { contains: email, mode: 'insensitive' } } : {}),
        ...(taxpayerRegistry
          ? {
              taxpayerRegistry: {
                contains: taxpayerRegistry,
                mode: 'insensitive',
              },
            }
          : {}),
      },
    });

    if (!customers || customers.length === 0) {
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
        this.logger.error(exception);
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
        this.logger.error('Unexpected exception: ', exception);
        throw exception;
      }
    }
  }
}
