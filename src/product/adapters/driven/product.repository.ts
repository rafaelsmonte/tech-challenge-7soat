import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/product/domain/model/product.entity';
import { IProductRepository } from 'src/product/domain/outboundPorts/product-repository.interface';
import { CreateProductDTO } from '../model/create-product.dto';
import { UpdateProductDTO } from '../model/update-product.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(productDTO: CreateProductDTO): Promise<ProductEntity> {
    const createdProduct = await this.prisma.product.create({
      data: {
        name: productDTO.name,
        price: productDTO.price,
        description: productDTO.description,
        pictures: productDTO.pictures,
        category: { connect: { id: productDTO.categoryId } },
      },
    });

    return this.findOne(createdProduct.id);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id: id } });
  }

  async update(
    id: number,
    productDTO: UpdateProductDTO,
  ): Promise<ProductEntity> {
    const updatedProduct = await this.prisma.product.update({
      where: { id: id },
      data: productDTO,
    });

    return this.findOne(updatedProduct.id);
  }

  async list(): Promise<ProductEntity[]> {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        price: true,
        description: true,
        pictures: true,
        category: true,
      },
    });
    return products.map((product) => new ProductEntity(product));
  }

  async retrieve(id: number): Promise<ProductEntity> {
    return this.findOne(id);
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.prisma.product.findUnique({
      where: { id: id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        price: true,
        description: true,
        pictures: true,
        category: true,
      },
    });

    return new ProductEntity(product);
  }
}
