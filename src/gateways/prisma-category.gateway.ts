import { PrismaClient, Category as PrismaCategory } from '@prisma/client';
import { Category } from 'src/entities/category.entity';
import { CategoryGateway } from 'src/interfaces/category.gateway.interface';
import { Database } from 'src/interfaces/database.interface';

export class PrismaCategoryGateway implements CategoryGateway {
  constructor(private database: Database) {}

  public async findAll(): Promise<Category[]> {
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
  }

  public async findById(id: number): Promise<Category | null> {
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
  }
}
