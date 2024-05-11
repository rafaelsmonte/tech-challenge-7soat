import { ApiProperty } from '@nestjs/swagger';
import { Costumer } from '@prisma/client';

export class CostumerEntity implements Costumer {
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
