import { Prisma, Product as PrismaProduct } from '@prisma/client';
import Decimal from 'decimal.js';
import { Product } from 'src/entities/product.entity';
import { DatabaseError } from 'src/errors/database.error';
import { Database } from 'src/interfaces/database.interface';
import { ProductGateway } from 'src/interfaces/product.gateway.interface';

export class PrismaProductGateway implements ProductGateway {
  constructor(private database: Database) {}

  public async findAll(): Promise<Product[]> {
    try {
      const products: PrismaProduct[] = await this.database.product.findMany();

      return products.map(
        (product) =>
          new Product(
            product.id,
            product.createdAt,
            product.updatedAt,
            product.name,
            new Decimal(product.price).toNumber(),
            product.description,
            product.pictures,
            product.categoryId,
          ),
      );
    } catch (error) {
      throw new DatabaseError('Failed to find products');
    }
  }

  public async findById(id: number): Promise<Product | null> {
    try {
      const product: PrismaProduct = await this.database.product.findUnique({
        where: { id },
      });

      if (!product) return null;

      return new Product(
        product.id,
        product.createdAt,
        product.updatedAt,
        product.name,
        new Decimal(product.price).toNumber(),
        product.description,
        product.pictures,
        product.categoryId,
      );
    } catch (error) {
      throw new DatabaseError('Failed to find product');
    }
  }

  public async save(product: Product): Promise<Product> {
    try {
      const createdProduct: PrismaProduct = await this.database.product.create({
        data: {
          name: product.getName(),
          price: new Prisma.Decimal(product.getPrice()),
          description: product.getDescription(),
          pictures: product.getPictures(),
          categoryId: product.getCategoryId(),
        },
      });

      return new Product(
        createdProduct.id,
        createdProduct.createdAt,
        createdProduct.updatedAt,
        createdProduct.name,
        new Decimal(product.getPrice()).toNumber(),
        createdProduct.description,
        createdProduct.pictures,
        createdProduct.categoryId,
      );
    } catch (error) {
      throw new DatabaseError('Failed to save product');
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.database.product.delete({ where: { id } });
    } catch (error) {
      throw new DatabaseError('Failed to delete product');
    }
  }
}
