import { Category } from 'src/entities/category.entity';

export interface CategoryGateway {
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
}
