import { Customer } from '@entities/customer.entity';
import { CustomerGateway } from '@interfaces/customer.gateway.interface';
import { PrismaClient } from '@prisma/client';

export class PrismaCustomerGateway implements CustomerGateway {
  constructor(private prisma: PrismaClient) {}

  public async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany();

    return customers.map(
      (customer) =>
        new Customer(
          customer.id,
          customer.createdAt,
          customer.updatedAt,
          customer.name,
          customer.taxpayerRegistry,
          customer.email,
        ),
    );
  }

  public async findByTaxpayerRegistry(
    taxpayerRegistry: string,
  ): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { taxpayerRegistry },
    });

    if (!customer) return null;

    return new Customer(
      customer.id,
      customer.createdAt,
      customer.updatedAt,
      customer.name,
      customer.taxpayerRegistry,
      customer.email,
    );
  }

  public async findById(id: number): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({ where: { id } });

    if (!customer) return null;

    return new Customer(
      customer.id,
      customer.createdAt,
      customer.updatedAt,
      customer.name,
      customer.taxpayerRegistry,
      customer.email,
    );
  }

  public async save(customer: Customer): Promise<Customer> {
    const createdCustomer = await this.prisma.customer.create({
      data: {
        name: customer.name,
        taxpayerRegistry: customer.taxpayerRegistry,
        email: customer.email,
      },
    });

    return new Customer(
      createdCustomer.id,
      createdCustomer.createdAt,
      createdCustomer.updatedAt,
      createdCustomer.name,
      createdCustomer.taxpayerRegistry,
      createdCustomer.email,
    );
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.customer.delete({ where: { id } });
  }
}
