import { Category } from '@entities/category.entity';
import { ICategoryGateway } from '@interfaces/category.gateway.interface';

export class CategoryUseCases {
  static async findAll(
    categoryGateway: ICategoryGateway,
  ): Promise<Category[] | null> {
    const categories = await categoryGateway.findAll();
    return categories;
  }
}
