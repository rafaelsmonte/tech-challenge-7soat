import { Module } from '@nestjs/common';
import { OrderController } from './adapters/driving/order.controller';
import { OrderService } from './domain/inboundPorts/order.service';
import { IOrderRepository } from './domain/outboundPorts/order-repository.interface';
import { OrderRepository } from './adapters/driven/order.repository';
import { IProductRepository } from 'src/product/domain/outboundPorts/product-repository.interface';
import { ProductRepository } from 'src/product/adapters/driven/product.repository';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: IOrderRepository,
      useClass: OrderRepository,
    },
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
  ],
})
export class OrderModule {}
