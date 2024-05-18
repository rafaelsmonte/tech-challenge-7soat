import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { CategoryType } from 'src/common/enum/category-type.enum';

export class CreateProductDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: Array })
  @IsArray()
  pictures: string[];

  @ApiProperty()
  @IsEnum(CategoryType)
  categoryId: number;
}
