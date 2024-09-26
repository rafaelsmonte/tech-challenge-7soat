import { Category } from '../entities/category.entity';
import { ICategoryGateway } from '../interfaces/category.gateway.interface';

export class CategoryUseCases {
  static async findAll(categoryGateway: ICategoryGateway): Promise<Category[]> {
    console.log('antes do find all');
    const categories = await categoryGateway.findAll();
    console.log('depois do find all');
    return categories;
  }
}
