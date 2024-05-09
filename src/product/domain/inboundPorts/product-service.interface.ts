import { Product } from '../model/product';

export interface IProductService {
  findAll(): Product[];
}
