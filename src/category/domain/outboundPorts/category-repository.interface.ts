import { CategoryEntity } from '../model/category.entity';

export interface ICategoryRepository {
  findAll(): Promise<CategoryEntity[]>;
}

export const ICategoryRepository = Symbol('ICategoryRepository');
