import { Category as PrismaCategory } from '@prisma/client';
import { Category } from 'src/entities/category.entity';
import { DatabaseError } from 'src/errors/database.error';
import { CategoryGateway } from 'src/interfaces/category.gateway.interface';
import { Database } from 'src/interfaces/database.interface';

export class PrismaCategoryGateway implements CategoryGateway {
  constructor(private database: Database) {}

  public async findAll(): Promise<Category[]> {
    try {
      const categories: PrismaCategory[] =
        await this.database.category.findMany();

      return categories.map(
        (category) =>
          new Category(
            category.id,
            category.createdAt,
            category.updatedAt,
            category.type,
          ),
      );
    } catch (error) {
      throw new DatabaseError('Failed to find categories');
    }
  }

  public async findById(id: number): Promise<Category | null> {
    try {
      const category: PrismaCategory = await this.database.category.findUnique({
        where: { id },
      });

      if (!category) return null;

      return new Category(
        category.id,
        category.createdAt,
        category.updatedAt,
        category.type,
      );
    } catch (error) {
      throw new DatabaseError('Failed to find category');
    }
  }
}
