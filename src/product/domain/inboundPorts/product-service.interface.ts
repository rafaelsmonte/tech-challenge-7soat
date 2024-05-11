import { ProductEntity } from '../model/product.entity';

export interface IProductService {
  findAll(): ProductEntity[];
}
