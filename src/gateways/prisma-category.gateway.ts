import { Category } from '@entities/category.entity';
import { CategoryGateway } from '@interfaces/category.gateway.interface';
import { IDatabase } from '@interfaces/database.interface';

export class PrismaCategoryGateway implements CategoryGateway {
  private _database: IDatabase;

  constructor(database: IDatabase) {
    this._database = database;
  }

  public async findAll(): Promise<Category[]> {
    throw new Error('Method not implemented.'); // TODO implement
  }

  public async findById(id: number): Promise<Category> {
    throw new Error('Method not implemented.'); // TODO implement
  }
}
