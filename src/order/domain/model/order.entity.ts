import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { CustomerEntity } from 'src/customer/domain/model/customer.entity';
import { ProductEntity } from 'src/product/domain/model/product.entity';

class ProductWithQuantityEntity extends ProductEntity {
  @ApiProperty()
  quantity: number;
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

  @ApiProperty()
  trackingId: number;

  @Transform(({ value }) => value.toNumber())
  @ApiProperty({ type: Number })
  totalPrice: Prisma.Decimal;

  @ApiProperty({ enum: OrderStatus })
  status: string;

  @ApiPropertyOptional({ type: CustomerEntity })
  customer?: CustomerEntity;

  @ApiProperty({ type: ProductWithQuantityEntity, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => ProductWithQuantityEntity)
  products: ProductWithQuantityEntity[];

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}
