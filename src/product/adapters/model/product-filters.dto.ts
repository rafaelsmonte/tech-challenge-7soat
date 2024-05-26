import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
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

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsOptional()
  @Transform(
    ({ value }) => (Array.isArray(value) ? value.map(Number) : [Number(value)]),
    { toClassOnly: true },
  )
  ids?: number[];
}
