import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';

export type ProductAndCategory = {
  product: Product;
  category: Category;
};
