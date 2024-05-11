import { CategoryEntity } from '../model/category.entity';

export interface ICategoryService {
  findAll(): Promise<CategoryEntity[]>;
}
