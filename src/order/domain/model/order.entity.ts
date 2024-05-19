import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
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

  @Transform(({ value }) => value.toNumber())
  @ApiProperty({ type: Number })
  totalPrice: Prisma.Decimal;

  @ApiProperty({ enum: OrderStatus })
  status: string;

  @ApiPropertyOptional({ type: CostumerEntity })
  @ValidateNested()
  @Type(() => CostumerEntity)
  costumer?: CostumerEntity;

  @ApiProperty({ type: ProductEntity, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => ProductEntity)
  products: ProductEntity[];

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
