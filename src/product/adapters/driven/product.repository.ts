import { Inject, Injectable, Logger } from '@nestjs/common';
import { ProductEntity } from 'src/product/domain/model/product.entity';
import { IProductRepository } from 'src/product/domain/outboundPorts/product-repository.interface';
import { CreateProductDTO } from '../model/create-product.dto';
import { UpdateProductDTO } from '../model/update-product.dto';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ProductNotFoundHttpException } from 'src/common/exceptions/http/http-exception';
import { Prisma } from '@prisma/client';
import { ProductFiltersDTO } from '../model/product-filters.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

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
    try {
      await this.prisma.product.delete({ where: { id: id } });
    } catch (exception) {
      if (
        exception instanceof Prisma.PrismaClientKnownRequestError &&
        exception.code === 'P2025'
      ) {
        throw new ProductNotFoundHttpException();
      } else {
        this.logger.error('Unexpected exception: ', exception);
        throw exception;
      }
    }
  }

  async update(
    id: number,
    productDTO: UpdateProductDTO,
  ): Promise<ProductEntity> {
    try {
      await this.prisma.product.update({
        where: { id: id },
        data: productDTO,
      });

      return this.findOne(id);
    } catch (exception) {
      if (
        exception instanceof Prisma.PrismaClientKnownRequestError &&
        exception.code === 'P2025'
      ) {
        throw new ProductNotFoundHttpException();
      } else {
        this.logger.error('Unexpected exception: ', exception);
        throw exception;
      }
    }
  }

  async list(productFiltersDTO: ProductFiltersDTO): Promise<ProductEntity[]> {
    const { categoryId, name, ids } = productFiltersDTO;

    const products = await this.prisma.product.findMany({
      where: {
        ...(categoryId ? { categoryId: categoryId } : {}),
        ...(name ? { name: { contains: name, mode: 'insensitive' } } : {}),
        ...(ids ? { id: { in: ids } } : {}),
      },
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

    if (!products || products.length === 0) {
      throw new ProductNotFoundHttpException();
    }

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

    if (!product) {
      throw new ProductNotFoundHttpException();
    }

    return new ProductEntity(product);
  }
}
