import { Controller, Get } from '@nestjs/common';
import { ProductService } from 'src/product/domain/inboundPorts/product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }
}
