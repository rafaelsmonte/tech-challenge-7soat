import { Category } from '@entities/category.entity';
import { CategoryGateway } from '@interfaces/category.gateway.interface';

export class CategoryUseCases {
  static async findAll(categoryGateway: CategoryGateway): Promise<Category[]> {
    const categories = await categoryGateway.findAll();
    return categories;
  }
}
