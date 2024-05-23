import { Inject, Injectable } from '@nestjs/common';
import { IProductService } from './product-service.interface';
import { IProductRepository } from '../outboundPorts/product-repository.interface';
import { ProductEntity } from '../model/product.entity';
import { CreateProductDTO } from 'src/product/adapters/model/create-product.dto';
import { UpdateProductDTO } from 'src/product/adapters/model/update-product.dto';
import { ProductFiltersDTO } from 'src/product/adapters/model/product-filters.dto';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}
  async create(productDTO: CreateProductDTO): Promise<ProductEntity> {
    return await this.productRepository.create(productDTO);
  }

  async list(productFiltersDTO: ProductFiltersDTO): Promise<ProductEntity[]> {
    return await this.productRepository.list(productFiltersDTO);
  }

  async retrieve(id: number): Promise<ProductEntity> {
    return await this.productRepository.retrieve(id);
  }

  async delete(id: number): Promise<void> {
    return await this.productRepository.delete(id);
  }

  async update(
    id: number,
    productDTO: UpdateProductDTO,
  ): Promise<ProductEntity> {
    return await this.productRepository.update(id, productDTO);
  }
}
