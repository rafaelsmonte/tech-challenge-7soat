import { ApiProperty } from '@nestjs/swagger';
import { CostumerEntity } from 'src/costumer/domain/model/costumer.entity';
import { ProductEntity } from 'src/product/domain/model/product.entity';

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
  products: ProductEntity[];

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
