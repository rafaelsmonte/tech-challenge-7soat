import { Product } from '../model/product';

export interface IProductRepository {
  findAll(): Product[];
}

export const IProductRepository = Symbol('IProductRepository');
