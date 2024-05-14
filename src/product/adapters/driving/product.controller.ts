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
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductEntity } from 'src/product/domain/model/product.entity';
import { UpdateProductDTO } from '../model/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiCreatedResponse()
  async create(@Body() productDTO: CreateProductDTO) {
    return await this.productService.create(productDTO);
  }

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findAll(): Promise<ProductEntity[]> {
    return await this.productService.findAll();
  }

  @Delete(':id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    return await this.productService.delete(id);
  }

  @Patch(':id')
  @ApiCreatedResponse()
  async update(@Param('id') id: number, @Body() costumerDTO: UpdateProductDTO) {
    return await this.productService.update(id, costumerDTO);
  }
}
