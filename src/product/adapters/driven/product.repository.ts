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
    return await this.prisma.product.create({
      data: productDTO,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id: id } });
  }

  async update(
    id: number,
    productDTO: UpdateProductDTO,
  ): Promise<ProductEntity> {
    return this.prisma.product.update({ where: { id: id }, data: productDTO });
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.prisma.product.findMany();
    return products.map((product) => new ProductEntity(product));
  }
}
