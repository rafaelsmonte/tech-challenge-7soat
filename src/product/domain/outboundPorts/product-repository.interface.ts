import { CreateProductDTO } from 'src/product/adapters/model/create-product.dto';
import { ProductEntity } from '../model/product.entity';
import { UpdateProductDTO } from 'src/product/adapters/model/update-product.dto';

export interface IProductRepository {
  list(): Promise<ProductEntity[]>;
  retrieve(id: number): Promise<ProductEntity>;
  create(productDTO: CreateProductDTO): Promise<ProductEntity>;
  delete(id: number): Promise<void>;
  update(id: number, productDTO: UpdateProductDTO): Promise<ProductEntity>;
}

export const IProductRepository = Symbol('IProductRepository');
