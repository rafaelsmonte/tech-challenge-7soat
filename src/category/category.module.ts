import { Module } from '@nestjs/common';
import { CategoryRepository } from './adapters/driven/category.repository';
import { CategoryController } from './adapters/driving/category.controller';
import { CategoryService } from './domain/inboundPorts/category.service';
import { ICategoryRepository } from './domain/outboundPorts/category-repository.interface';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: ICategoryRepository,
      useClass: CategoryRepository,
    },
  ],
})
export class CategoryModule {}
