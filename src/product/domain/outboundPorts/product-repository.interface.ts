import { ProductEntity } from '../model/product.entity';

export interface IProductRepository {
  findAll(): ProductEntity[];
}

export const IProductRepository = Symbol('IProductRepository');
