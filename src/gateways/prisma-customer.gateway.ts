import { Customer as PrismaCustomer } from '@prisma/client';
import { Customer } from 'src/entities/customer.entity';
import { DatabaseError } from 'src/errors/database.error';
import { CustomerGateway } from 'src/interfaces/customer.gateway.interface';
import { Database } from 'src/interfaces/database.interface';

export class PrismaCustomerGateway implements CustomerGateway {
  constructor(private database: Database) {}

  public async findAll(): Promise<Customer[]> {
    try {
      const customers: PrismaCustomer[] =
        await this.database.customer.findMany();

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
    } catch (error) {
      throw new DatabaseError('Failed to find customers');
    }
  }

  public async findByTaxpayerRegistry(
    taxpayerRegistry: string,
  ): Promise<Customer | null> {
    try {
      const customer: PrismaCustomer = await this.database.customer.findUnique({
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
    } catch (error) {
      throw new DatabaseError('Failed to find customer');
    }
  }

  public async findById(id: number): Promise<Customer | null> {
    try {
      const customer: PrismaCustomer = await this.database.customer.findUnique({
        where: { id },
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
    } catch (error) {
      throw new DatabaseError('Failed to find customer');
    }
  }

  public async save(customer: Customer): Promise<Customer> {
    try {
      const createdCustomer: PrismaCustomer =
        await this.database.customer.create({
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
    } catch (error) {
      throw new DatabaseError('Failed to save customer');
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.database.customer.delete({ where: { id } });
    } catch (error) {
      throw new DatabaseError('Failed to delete customer');
    }
  }
}
