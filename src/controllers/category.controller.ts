import { CategoryAdapter } from 'src/adapters/category.adapter';
import { CategoryGateway } from 'src/gateways/category.gateway';
import { IDatabase } from 'src/interfaces/database.interface';
import { CategoryUseCases } from 'src/usecases/category.usecases';

export class CategoryController {
  static async findAll(database: IDatabase): Promise<string> {
    const categoryGateway = new CategoryGateway(database);
    const categories = await CategoryUseCases.findAll(categoryGateway);
    const categoriesJson = CategoryAdapter.adaptArrayJson(categories);

    return categoriesJson;
  }
}
