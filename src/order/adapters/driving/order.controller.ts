import { Controller, Get } from '@nestjs/common';
import { OrderService } from 'src/order/domain/inboundPorts/order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }
}
