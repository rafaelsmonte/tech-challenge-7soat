import { Product } from 'src/entities/product.entity';

export interface ProductGateway {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  save(product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}
