import { Category } from 'src/entities/category.entity';

export interface ICategoryGateway {
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category | null>;
}
