import { Product } from '@entities/product.entity';
import { IDatabase } from '@interfaces/database.interface';
import { ProductGateway } from '@interfaces/product.gateway.interface';

export class PrismaProductGateway implements ProductGateway {
  private _database: IDatabase;

  constructor(database: IDatabase) {
    this._database = database;
  }

  public async findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.'); // TODO implement
  }

  public findById(id: number): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  public save(
    name: string,
    price: number,
    description: string,
    pictures: string[],
    categoryId: number,
  ): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  public delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
