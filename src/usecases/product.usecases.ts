import { ICategoryGateway } from '@interfaces/category.gateway.interface';
import { IProductGateway } from '@interfaces/product.gateway.interface';
import { ProductAndCategory } from 'src/types/product-and-category.interface';

// TODO handle errors

export class ProductUseCases {
  static async findAll(
    productGateway: IProductGateway,
    categoryGateway: ICategoryGateway,
  ): Promise<ProductAndCategory[]> {
    const productsAndCategory: ProductAndCategory[] = [];

    const products = await productGateway.findAll();

    products.forEach(async (product) => {
      const category = await categoryGateway.findById(product.id);
      productsAndCategory.push({ product, category });
    });

    return productsAndCategory;
  }

  static async findById(
    productGateway: IProductGateway,
    categoryGateway: ICategoryGateway,
    id: number,
  ): Promise<ProductAndCategory> {
    const product = await productGateway.findById(id);

    const category = await categoryGateway.findById(product.id);

    return { product, category };
  }

  static async create(
    productGateway: IProductGateway,
    categoryGateway: ICategoryGateway,
    name: string,
    price: number,
    description: string,
    pictures: string[],
    categoryId: number,
  ): Promise<ProductAndCategory> {
    const category = await categoryGateway.findById(categoryId);

    const product = await productGateway.save(
      name,
      price,
      description,
      pictures,
      categoryId,
    );

    return { product, category };
  }

  static async delete(
    productGateway: IProductGateway,
    id: number,
  ): Promise<void> {
    await productGateway.delete(id);
  }
}
