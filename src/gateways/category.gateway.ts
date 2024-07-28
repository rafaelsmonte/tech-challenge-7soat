import { Category } from 'src/entities/category.entity';
import { ICategoryGateway } from 'src/interfaces/category.gateway.interface';
import { IDatabase } from 'src/interfaces/database.interface';

export class CategoryGateway implements ICategoryGateway {
  constructor(private database: IDatabase) {}

  public async findAll(): Promise<Category[]> {
    return this.database.findAllCategories();
  }

  public async findById(id: number): Promise<Category | null> {
    return this.database.findCategoryById(id);
  }
}
