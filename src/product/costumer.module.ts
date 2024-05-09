import { Module } from '@nestjs/common';
import { productController } from './adapters/driving/product.controller';
import { productService } from './domain/inboundPorts/product.service';

@Module({
  controllers: [productController],
  providers: [productService],
})
export class productModule {}
