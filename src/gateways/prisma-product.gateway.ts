import { Product } from '@entities/product.entity';
import { ProductGateway } from '@interfaces/product.gateway.interface';
import { PrismaClient } from '@prisma/client';

export class PrismaProductGateway implements ProductGateway {
  constructor(private prisma: PrismaClient) {}

  public async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();

    return products.map(
      (product) =>
        new Product(
          product.id,
          product.createdAt,
          product.updatedAt,
          product.name,
          product.price,
          product.description,
          product.pictures,
          product.categoryId,
        ),
    );
  }

  public async findById(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) return null;

    return new Product(
      product.id,
      product.createdAt,
      product.updatedAt,
      product.name,
      product.price,
      product.description,
      product.pictures,
      product.categoryId,
    );
  }

  public async save(product: Product): Promise<Product> {
    const createdProduct = await this.prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
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
      createdProduct.price,
      createdProduct.description,
      createdProduct.pictures,
      createdProduct.categoryId,
    );
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
