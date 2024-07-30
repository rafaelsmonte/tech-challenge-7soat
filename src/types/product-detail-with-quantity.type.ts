import { Product } from 'src/entities/product.entity';

export type ProductDetailWithQuantity = {
  product: Product;
  quantity: number;
};
