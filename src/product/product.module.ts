import { Module } from '@nestjs/common';
import { ProductController } from './adapters/driving/product.controller';
import { ProductService } from './domain/inboundPorts/product.service';
import { IProductRepository } from './domain/outboundPorts/product-repository.interface';
import { ProductRepository } from './adapters/driven/product.repository';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
  ],
})
export class ProductModule {}
