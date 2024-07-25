import { Product } from 'src/entities/product.entity';
import { CategoryNotFoundError } from 'src/errors/category-not-found.error';
import { ProductNotFoundError } from 'src/errors/product-not-found.error';
import { CategoryGateway } from 'src/interfaces/category.gateway.interface';
import { ProductGateway } from 'src/interfaces/product.gateway.interface';
import { ProductAndCategory } from 'src/types/product-and-category.type';

// TODO retornar todas as entidades associadas ou apenas seus IDs?

export class ProductUseCases {
  static async findAll(
    productGateway: ProductGateway,
    categoryGateway: CategoryGateway,
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
    productGateway: ProductGateway,
    categoryGateway: CategoryGateway,
    id: number,
  ): Promise<ProductAndCategory> {
    const product = await productGateway.findById(id);

    if (!product) throw new ProductNotFoundError('Product not found');

    const category = await categoryGateway.findById(product.getId());

    if (!category) throw new CategoryNotFoundError('Category not found');

    return { product, category };
  }

  static async create(
    productGateway: ProductGateway,
    categoryGateway: CategoryGateway,
    name: string,
    price: number,
    description: string,
    pictures: string[],
    categoryId: number,
  ): Promise<ProductAndCategory> {
    const category = await categoryGateway.findById(categoryId);

    if (!category) throw new CategoryNotFoundError('Category not found');

    const newProduct = await productGateway.save(
      Product.new(name, price, description, pictures, categoryId),
    );

    return { product: newProduct, category };
  }

  static async delete(
    productGateway: ProductGateway,
    id: number,
  ): Promise<void> {
    const product = await productGateway.findById(id);

    if (!product) throw new ProductNotFoundError('Product not found');

    await productGateway.delete(id);
  }
}
