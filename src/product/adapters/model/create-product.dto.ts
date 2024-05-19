import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString, Min } from 'class-validator';
import { CategoryType } from 'src/common/enum/category-type.enum';

export class CreateProductDTO {
  @ApiProperty({ example: 'product name' })
  @IsString()
  name: string;

  @ApiProperty()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ type: Array })
  @IsArray()
  @IsString({ each: true })
  pictures: string[];

  @ApiProperty()
  @IsEnum(CategoryType)
  categoryId: number;
}
