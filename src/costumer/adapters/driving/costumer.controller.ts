import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CostumerService } from 'src/costumer/domain/inboundPorts/costumer.service';
import { CostumerEntity } from 'src/costumer/domain/model/costumer.entity';

@Controller('Costumer')
export class CostumerController {
  constructor(private costumerService: CostumerService) {}

  @Get()
  @ApiOkResponse({ type: CostumerEntity, isArray: true })
  async findAll(): Promise<CostumerEntity[]> {
    return await this.costumerService.findAll();
  }
}
