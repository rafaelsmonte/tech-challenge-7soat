import { Category } from '@entities/category.entity';

export interface ICategoryGateway {
  findAll(): Promise<Category[] | null>;
}
