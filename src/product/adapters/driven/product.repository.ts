import { Injectable } from '@nestjs/common';
import { Product } from 'src/product/domain/model/product';
import { IProductRepository } from 'src/product/domain/outboundPorts/product-repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  findAll(): Product[] {
    throw new Error('Method not implemented.');
  }
}
