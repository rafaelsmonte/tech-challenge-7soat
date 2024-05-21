import { UpdateProductDTO } from 'src/product/adapters/model/update-product.dto';
import { ProductEntity } from '../model/product.entity';
import { CreateProductDTO } from 'src/product/adapters/model/create-product.dto';

export interface IProductService {
  list(): Promise<ProductEntity[]>;
  retrieve(id: number): Promise<ProductEntity>;
  create(customerDTO: CreateProductDTO): Promise<ProductEntity>;
  delete(id: number): Promise<void>;
  update(id: number, customerDTO: UpdateProductDTO): Promise<ProductEntity>;
}
