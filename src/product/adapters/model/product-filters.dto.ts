import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CategoryType } from 'src/common/enum/category-type.enum';

export class ProductFiltersDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(CategoryType)
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
