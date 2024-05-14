import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';

export class ProductEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @Transform(({ value }) => value.toNumber)
  @ApiProperty({ type: String })
  price: Prisma.Decimal;

  @ApiProperty()
  description: string;

  @ApiProperty()
  pictures: string;

  @ApiProperty()
  categoryId: number;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
