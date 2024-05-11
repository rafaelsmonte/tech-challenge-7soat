import { Module } from '@nestjs/common';
import { OrderController } from './adapters/driving/order.controller';
import { OrderService } from './domain/inboundPorts/order.service';
import { IOrderRepository } from './domain/outboundPorts/order-repository.interface';
import { OrderRepository } from './adapters/driven/order.repository';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: IOrderRepository,
      useClass: OrderRepository,
    },
  ],
})
export class OrderModule {}
