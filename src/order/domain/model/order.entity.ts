import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { CostumerEntity } from 'src/costumer/domain/model/costumer.entity';

class OrderProductEntity {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  @Transform(({ value }) => value.toNumber)
  @ApiProperty({ type: String })
  unitPrice: Prisma.Decimal;
}

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

  @ApiProperty()
  orderProducts: OrderProductEntity[];

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
