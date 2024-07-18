import { Product } from '@entities/product.entity';

export interface IProductGateway {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  save(
    name: string,
    price: number,
    description: string,
    pictures: string[],
    categoryId: number,
  ): Promise<Product>;
  delete(id: number): Promise<void>;
}
