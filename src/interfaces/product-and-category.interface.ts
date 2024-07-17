import { Category } from '@entities/category.entity';
import { Product } from '@entities/product.entity';

export interface ProductAndCategory {
  product: Product;
  category: Category;
}
