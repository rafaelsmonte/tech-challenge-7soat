import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/category/domain/model/category.entity';
import { ICategoryRepository } from 'src/category/domain/outboundPorts/category-repository.interface';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.prisma.category.findMany();
    return categories.map((category) => new CategoryEntity(category));
  }
}
