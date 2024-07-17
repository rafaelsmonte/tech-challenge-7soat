import { Category } from '@entities/category.entity';
import { ICategoryGateway } from '@interfaces/category.gateway.interface';
import { IDatabase } from '@interfaces/database.interface';

export class CategoryGateway implements ICategoryGateway {
  private _database: IDatabase;

  constructor(database: IDatabase) {
    this._database = database;
  }

  public async findAll(): Promise<Category[] | null> {
    return null; // TODO implement
  }
}
