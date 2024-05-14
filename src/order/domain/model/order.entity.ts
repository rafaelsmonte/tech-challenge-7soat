import { ApiProperty } from '@nestjs/swagger';
import { CostumerEntity } from 'src/costumer/domain/model/costumer.entity';

export class OrderEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  notes: string;

  @ApiProperty({ required: false })
  costumer?: CostumerEntity;

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
