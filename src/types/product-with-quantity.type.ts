import { Product } from 'src/entities/product.entity';

export type ProductWithQuantity = {
  product: Product;
  quantity: number;
};
