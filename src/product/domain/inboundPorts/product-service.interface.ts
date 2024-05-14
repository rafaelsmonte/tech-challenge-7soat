import { UpdateProductDTO } from 'src/product/adapters/model/update-product.dto';
import { ProductEntity } from '../model/product.entity';
import { CreateProductDTO } from 'src/product/adapters/model/create-product.dto';

export interface IProductService {
  findAll(): Promise<ProductEntity[]>;
  create(costumerDTO: CreateProductDTO): Promise<ProductEntity>;
  delete(id: number): Promise<void>;
  update(id: number, costumerDTO: UpdateProductDTO): Promise<ProductEntity>;
}
