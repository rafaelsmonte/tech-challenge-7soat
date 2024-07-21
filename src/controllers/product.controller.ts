import { ProductAdapter } from 'src/adapters/product.adapter';
import { PrismaCategoryGateway } from 'src/gateways/prisma-category.gateway';
import { PrismaProductGateway } from 'src/gateways/prisma-product.gateway';
import { Database } from 'src/interfaces/database.interface';
import { ProductUseCases } from 'src/usecases/product.usecases';

export class ProductController {
  static async findAll(database: Database): Promise<string> {
    try {
      const productGateway = new PrismaProductGateway(database);
      const categoryGateway = new PrismaCategoryGateway(database);

      const productsAndCategory = await ProductUseCases.findAll(
        productGateway,
        categoryGateway,
      );

      return ProductAdapter.adaptArrayJson(productsAndCategory);
    } catch (error) {
      const adaptedError = ProductAdapter.adaptError(error);
      // TODO como retornar? A princípio, o controller deveria devolver apenas
      // uma string para que camada superior (API Restful, CLI, msg broker),
      // mas desta forma, como descobrir o status code associado à mensagem?
    }
  }

  static async findById(database: Database, id: number): Promise<string> {
    const productGateway = new PrismaProductGateway(database);
    const categoryGateway = new PrismaCategoryGateway(database);

    const productAndCategory = await ProductUseCases.findById(
      productGateway,
      categoryGateway,
      id,
    );

    return ProductAdapter.adaptJson(productAndCategory);
  }

  static async create(
    database: Database,
    name: string,
    price: number,
    description: string,
    pictures: string[],
    categoryId: number,
  ): Promise<string> {
    const productGateway = new PrismaProductGateway(database);
    const categoryGateway = new PrismaCategoryGateway(database);

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

  static async delete(database: Database, id: number): Promise<void> {
    const productGateway = new PrismaProductGateway(database);
    await ProductUseCases.delete(productGateway, id);
  }

  // TODO implement update flow
}
