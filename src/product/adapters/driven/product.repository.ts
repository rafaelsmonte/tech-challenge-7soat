import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/product/domain/model/product.entity';
import { IProductRepository } from 'src/product/domain/outboundPorts/product-repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  findAll(): ProductEntity[] {
    throw new Error('Method not implemented.');
  }
}
