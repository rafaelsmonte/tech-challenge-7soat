import { UpdateProductDTO } from 'src/product/adapters/model/update-product.dto';
import { ProductEntity } from '../model/product.entity';
import { CreateProductDTO } from 'src/product/adapters/model/create-product.dto';
import { ProductFiltersDTO } from 'src/product/adapters/model/product-filters.dto';

export interface IProductService {
  list(productFiltersDTO: ProductFiltersDTO): Promise<ProductEntity[]>;
  retrieve(id: number): Promise<ProductEntity>;
  create(customerDTO: CreateProductDTO): Promise<ProductEntity>;
  delete(id: number): Promise<void>;
  update(id: number, customerDTO: UpdateProductDTO): Promise<ProductEntity>;
}
