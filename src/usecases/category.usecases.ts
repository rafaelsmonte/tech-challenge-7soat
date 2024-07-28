import { Category } from 'src/entities/category.entity';
import { ICategoryGateway } from 'src/interfaces/category.gateway.interface';

export class CategoryUseCases {
  static async findAll(categoryGateway: ICategoryGateway): Promise<Category[]> {
    const categories = await categoryGateway.findAll();
    return categories;
  }
}
