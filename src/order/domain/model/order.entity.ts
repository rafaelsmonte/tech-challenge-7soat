import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { CustomerEntity } from 'src/customer/domain/model/customer.entity';
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

  @ApiPropertyOptional({ type: CustomerEntity })
  @ValidateNested()
  @Type(() => CustomerEntity)
  customer?: CustomerEntity;

  @ApiProperty({ type: ProductEntity, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => ProductEntity)
  products: ProductEntity[];

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
