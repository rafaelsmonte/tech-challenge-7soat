import { ApiProperty } from '@nestjs/swagger';

export class CostumerEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ example: 'costumer name' })
  name: string;

  @ApiProperty({ example: '01234567890' })
  taxpayerRegistry: string;

  @ApiProperty({ example: 'costumer@email.com' })
  email: string;

  constructor(partial: Partial<CostumerEntity>) {
    Object.assign(this, partial);
  }
}
