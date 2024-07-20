import { Category } from '@entities/category.entity';
import { CategoryGateway } from '@interfaces/category.gateway.interface';
import { PrismaClient } from '@prisma/client';

// TODO implement

export class PrismaCategoryGateway implements CategoryGateway {
  constructor(private prisma: PrismaClient) {}

  public async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();

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
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) return null;

    return new Category(
      category.id,
      category.createdAt,
      category.updatedAt,
      category.type,
    );
  }
}
