import { Module } from '@nestjs/common';
import { OrderController } from './adapters/driving/order.controller';
import { OrderService } from './domain/inboundPorts/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
