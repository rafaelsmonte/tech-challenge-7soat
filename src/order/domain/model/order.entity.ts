import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/common/enum/order-status.enum';
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

  @ApiProperty()
  trackingId: number;

  @ApiProperty({ enum: OrderStatus })
  status: string;

  @ApiProperty({ required: false })
  costumer?: CostumerEntity;

  @ApiProperty({ type: ProductEntity })
  products: ProductEntity[];

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
