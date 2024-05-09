import { Inject, Injectable } from '@nestjs/common';
import { IProductService } from './product-service.interface';
import { IProductRepository } from '../outboundPorts/product-repository.interface';
import { Product } from '../model/product';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}
  findAll(): Product[] {
    throw new Error('Method not implemented.');
  }
}
