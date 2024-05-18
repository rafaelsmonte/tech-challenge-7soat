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
import { CostumerService } from 'src/costumer/domain/inboundPorts/costumer.service';
import { CostumerEntity } from 'src/costumer/domain/model/costumer.entity';
import { CreateCostumerDTO } from '../model/create-costumer.dto';
import { UpdateCostumerDTO } from '../model/update-costumer.dto';

@Controller('costumer')
export class CostumerController {
  constructor(private costumerService: CostumerService) {}

  @Post()
  @ApiCreatedResponse()
  async create(@Body() costumerDTO: CreateCostumerDTO) {
    return await this.costumerService.create(costumerDTO);
  }

  @Get()
  @ApiOkResponse({ type: CostumerEntity, isArray: true })
  async list(): Promise<CostumerEntity[]> {
    return await this.costumerService.list();
  }

  @Get('id')
  @ApiOkResponse({ type: CostumerEntity })
  async retrieve(@Param('id') id: number): Promise<CostumerEntity> {
    return await this.costumerService.retrieve(id);
  }

  @Delete(':id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    return await this.costumerService.delete(id);
  }

  @Patch(':id')
  @ApiCreatedResponse()
  async update(
    @Param('id') id: number,
    @Body() costumerDTO: UpdateCostumerDTO,
  ) {
    return await this.costumerService.update(id, costumerDTO);
  }
}
