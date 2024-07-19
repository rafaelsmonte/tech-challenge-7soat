import { Category } from '@entities/category.entity';

export interface CategoryGateway {
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category>;
}
