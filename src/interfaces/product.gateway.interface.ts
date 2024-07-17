import { Product } from '@entities/product.entity';

export interface IProductGateway {
  findAll(): Promise<Product | null>;
}
