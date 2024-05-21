import { ApiProperty } from '@nestjs/swagger';

export class CustomerEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ example: 'customer name' })
  name: string;

  @ApiProperty({ example: '01234567890' })
  taxpayerRegistry: string;

  @ApiProperty({ example: 'customer@email.com' })
  email: string;

  constructor(partial: Partial<CustomerEntity>) {
    Object.assign(this, partial);
  }
}
