import { ApiProperty } from '@nestjs/swagger';

class OrderProduct {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;
}

export class CreateOrderDTO {
  @ApiProperty()
  costumerId: number;

  @ApiProperty()
  notes: string;

  @ApiProperty({ type: OrderProduct, isArray: true })
  orderProducts: OrderProduct[];
}
