import { IDatabase } from '@interfaces/database.interface';
import { CategoryUseCases } from '@usecases/category.usecases';
import { CategoryAdapter } from 'src/adapters/category.adapter';
import { CategoryGateway } from 'src/gateways/category.gateway';

export class CategoryController {
  static async findAll(database: IDatabase): Promise<string> {
    const categoryGateway = new CategoryGateway(database);
    const categories = await CategoryUseCases.findAll(categoryGateway);
    const categoriesJson = CategoryAdapter.adaptArrayJson(categories);
    return categoriesJson;
  }
}
