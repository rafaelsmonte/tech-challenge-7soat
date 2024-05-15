import { ApiProperty } from '@nestjs/swagger';

class OrderProductDTO {
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

  @ApiProperty({ type: OrderProductDTO, isArray: true })
  orderProducts: OrderProductDTO[];
}
