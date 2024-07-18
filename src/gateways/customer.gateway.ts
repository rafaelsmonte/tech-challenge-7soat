import { Customer } from '@entities/customer.entity';
import { ICustomerGateway } from '@interfaces/customer.gateway.interface';
import { IDatabase } from '@interfaces/database.interface';

export class CustomerGateway implements ICustomerGateway {
  private _database: IDatabase;

  constructor(database: IDatabase) {
    this._database = database;
  }

  public async findAll(): Promise<Customer[]> {
    throw new Error('Method not implemented.'); // TODO implement
  }

  public async findByTaxpayerRegistry(
    taxpayerRegistry: string,
  ): Promise<Customer> {
    throw new Error('Method not implemented.'); // TODO implement
  }

  public async findById(id: number): Promise<Customer> {
    throw new Error('Method not implemented.'); // TODO implement
  }

  public async save(
    name: string,
    taxpayerRegistry: string,
    email: string,
  ): Promise<Customer> {
    throw new Error('Method not implemented.'); // TODO implement
  }

  public async delete(id: number): Promise<void> {
    throw new Error('Method not implemented.'); // TODO implement
  }
}
