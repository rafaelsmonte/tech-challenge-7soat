import { Product } from '@entities/product.entity';
import { IDatabase } from '@interfaces/database.interface';
import { IProductGateway } from '@interfaces/product.gateway.interface';

export class ProductGateway implements IProductGateway {
  private _database: IDatabase;

  constructor(database: IDatabase) {
    this._database = database;
  }

  public async findAll(): Promise<Product | null> {
    return null; // TODO implement
  }
}
