import { Prisma, PrismaClient, Product as PrismaProduct } from '@prisma/client';
import Decimal from 'decimal.js';
import { Product } from 'src/entities/product.entity';
import { Database } from 'src/interfaces/database.interface';
import { ProductGateway } from 'src/interfaces/product.gateway.interface';

export class PrismaProductGateway implements ProductGateway {
  constructor(private database: Database) {}

  public async findAll(): Promise<Product[]> {
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
  }

  public async findById(id: number): Promise<Product | null> {
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
  }

  public async save(product: Product): Promise<Product> {
    const createdProduct: PrismaProduct = await this.database.product.create({
      data: {
        name: product.name,
        price: new Prisma.Decimal(product.price),
        description: product.description,
        pictures: product.pictures,
        categoryId: product.categoryId,
      },
    });

    return new Product(
      createdProduct.id,
      createdProduct.createdAt,
      createdProduct.updatedAt,
      createdProduct.name,
      new Decimal(product.price).toNumber(),
      createdProduct.description,
      createdProduct.pictures,
      createdProduct.categoryId,
    );
  }

  public async delete(id: number): Promise<void> {
    await this.database.product.delete({ where: { id } });
  }
}
