import { Product } from 'src/entities/product.entity';
import { CategoryNotFoundError } from 'src/errors/category-not-found.error';
import { ProductNotFoundError } from 'src/errors/product-not-found.error';
import { ICategoryGateway } from 'src/interfaces/category.gateway.interface';
import { IProductGateway } from 'src/interfaces/product.gateway.interface';
import { ProductAndCategory } from 'src/types/product-and-category.type';

// TODO retornar todas as entidades associadas ou apenas seus IDs?

export class ProductUseCases {
  static async findAll(
    productGateway: IProductGateway,
    categoryGateway: ICategoryGateway,
  ): Promise<ProductAndCategory[]> {
    let productsAndCategory: ProductAndCategory[] = [];

    const products = await productGateway.findAll();

    for (const product of products) {
      const category = await categoryGateway.findById(product.getCategoryId());

      if (!category) throw new CategoryNotFoundError('Category not found');

      const productAndCategory: ProductAndCategory = { product, category };

      productsAndCategory.push(productAndCategory);
    }

    return productsAndCategory;
  }

  static async findById(
    productGateway: IProductGateway,
    categoryGateway: ICategoryGateway,
    id: number,
  ): Promise<ProductAndCategory> {
    const product = await productGateway.findById(id);

    if (!product) throw new ProductNotFoundError('Product not found');

    const category = await categoryGateway.findById(product.getId());

    if (!category) throw new CategoryNotFoundError('Category not found');

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

    if (!category) throw new CategoryNotFoundError('Category not found');

    const newProduct = await productGateway.create(
      Product.new(name, price, description, pictures, categoryId),
    );

    return { product: newProduct, category };
  }

  static async delete(
    productGateway: IProductGateway,
    id: number,
  ): Promise<void> {
    const product = await productGateway.findById(id);

    if (!product) throw new ProductNotFoundError('Product not found');

    await productGateway.delete(id);
  }
}
