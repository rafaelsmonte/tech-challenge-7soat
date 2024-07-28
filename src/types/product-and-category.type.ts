import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';

export type ProductAndCategory = {
  product: Product;
  category: Category;
};
