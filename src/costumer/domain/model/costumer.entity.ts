import { ApiProperty } from '@nestjs/swagger';

export class CostumerEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  taxpayerRegistry: string;

  @ApiProperty()
  email: string;

  constructor(partial: Partial<CostumerEntity>) {
    Object.assign(this, partial);
  }
}
