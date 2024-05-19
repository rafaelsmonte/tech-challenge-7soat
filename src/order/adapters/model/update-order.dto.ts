import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from 'src/common/enum/order-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateOrderDTO {
  @ApiProperty({
    enum: OrderStatus,
    example: `${OrderStatus.AWAITING}, ${OrderStatus.IN_PROGRESS}, ${OrderStatus.DONE} or ${OrderStatus.CANCELLED}`,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
