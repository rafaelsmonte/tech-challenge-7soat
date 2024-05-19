import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { OrderService } from 'src/order/domain/inboundPorts/order.service';
import { CreateOrderDTO } from '../model/create-order.dto';
import { OrderEntity } from 'src/order/domain/model/order.entity';
import { UpdateOrderDTO } from '../model/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiCreatedResponse({ type: OrderEntity })
  async create(@Body() orderDTO: CreateOrderDTO) {
    return await this.orderService.create(orderDTO);
  }

  @Get()
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  async list(): Promise<OrderEntity[]> {
    return await this.orderService.list();
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderEntity })
  async retrieve(@Param('id') id: number): Promise<OrderEntity> {
    return await this.orderService.retrieve(id);
  }

  @Delete(':id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    return await this.orderService.delete(id);
  }

  @Patch(':id/change-status')
  @ApiCreatedResponse({ type: OrderEntity })
  async update(@Param('id') id: number, @Body() orderDTO: UpdateOrderDTO) {
    return await this.orderService.update(id, orderDTO);
  }
}
