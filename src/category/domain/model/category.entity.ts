import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  type: string;

  constructor(partial: Partial<CategoryEntity>) {
    Object.assign(this, partial);
  }
}
