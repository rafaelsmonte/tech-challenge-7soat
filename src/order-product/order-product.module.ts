import { Module } from '@nestjs/common';
import { OrderProductRepository } from './adapters/driven/order-product.repository';
import { OrderProductService } from './domain/inbountPorts/order-product.service';
import { IOrderProductRepository } from './domain/outboundPorts/order-product-repository.interface';

@Module({
  providers: [
    OrderProductService,
    {
      provide: IOrderProductRepository,
      useClass: OrderProductRepository,
    },
  ],
})
export class OrderProductModule {}
