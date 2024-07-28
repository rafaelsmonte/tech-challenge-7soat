import { ProductAdapter } from '../adapters/product.adapter';
import { CategoryGateway } from '../gateways/category.gateway';
import { ProductGateway } from '../gateways/product.gateway';
import { IDatabase } from '../interfaces/database.interface';
import { ProductUseCases } from '../usecases/product.usecases';

export class ProductController {
  static async findAll(database: IDatabase): Promise<string> {
    const productGateway = new ProductGateway(database);
    const categoryGateway = new CategoryGateway(database);

    const productsAndCategory = await ProductUseCases.findAll(
      productGateway,
      categoryGateway,
    );

    return ProductAdapter.adaptArrayJson(productsAndCategory);
  }

  static async findById(database: IDatabase, id: number): Promise<string> {
    const productGateway = new ProductGateway(database);
    const categoryGateway = new CategoryGateway(database);

    const productAndCategory = await ProductUseCases.findById(
      productGateway,
      categoryGateway,
      id,
    );

    return ProductAdapter.adaptJson(productAndCategory);
  }

  static async create(
    database: IDatabase,
    name: string,
    price: number,
    description: string,
    pictures: string[],
    categoryId: number,
  ): Promise<string> {
    const productGateway = new ProductGateway(database);
    const categoryGateway = new CategoryGateway(database);

    const productAndCategory = await ProductUseCases.create(
      productGateway,
      categoryGateway,
      name,
      price,
      description,
      pictures,
      categoryId,
    );

    return ProductAdapter.adaptJson(productAndCategory);
  }

  static async delete(database: IDatabase, id: number): Promise<void> {
    const productGateway = new ProductGateway(database);

    await ProductUseCases.delete(productGateway, id);
  }

  // TODO implement update flow
}
