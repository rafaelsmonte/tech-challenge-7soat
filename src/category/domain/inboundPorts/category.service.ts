import { Inject, Injectable } from '@nestjs/common';
import { ICategoryService } from './category-service.interface';
import { ICategoryRepository } from '../outboundPorts/category-repository.interface';
import { CategoryEntity } from '../model/category.entity';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) {}
  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findAll();
  }
}
