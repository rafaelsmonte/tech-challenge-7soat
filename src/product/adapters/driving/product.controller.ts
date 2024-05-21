import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from 'src/product/domain/inboundPorts/product.service';
import { CreateProductDTO } from '../model/create-product.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from 'src/product/domain/model/product.entity';
import { UpdateProductDTO } from '../model/update-product.dto';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiCreatedResponse()
  async create(@Body() productDTO: CreateProductDTO) {
    return await this.productService.create(productDTO);
  }

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async list(): Promise<ProductEntity[]> {
    return await this.productService.list();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  async retrieve(@Param('id') id: number): Promise<ProductEntity> {
    return await this.productService.retrieve(id);
  }

  @Delete(':id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    return await this.productService.delete(id);
  }

  @Patch(':id')
  @ApiCreatedResponse()
  async update(@Param('id') id: number, @Body() customerDTO: UpdateProductDTO) {
    return await this.productService.update(id, customerDTO);
  }
}
