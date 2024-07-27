import { Category } from 'src/entities/category.entity';
import { CategoryGateway } from 'src/interfaces/category.gateway.interface';
import { Database } from 'src/interfaces/database.interface';

export class PrismaCategoryGateway implements CategoryGateway {
  constructor(private database: Database) {}

  public async findAll(): Promise<Category[]> {
    return this.database.findAllCategories();
  }

  public async findById(id: number): Promise<Category | null> {
    return this.database.findCategoryById(id);
  }
}
