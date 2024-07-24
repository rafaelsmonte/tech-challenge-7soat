import { CategoryAdapter } from 'src/adapters/category.adapter';
import { PrismaCategoryGateway } from 'src/gateways/prisma-category.gateway';
import { Database } from 'src/interfaces/database.interface';
import { CategoryUseCases } from 'src/usecases/category.usecases';

export class CategoryController {
  static async findAll(database: Database): Promise<string> {
    const categoryGateway = new PrismaCategoryGateway(database);
    const categories = await CategoryUseCases.findAll(categoryGateway);
    const categoriesJson = CategoryAdapter.adaptArrayJson(categories);

    return categoriesJson;
  }
}
