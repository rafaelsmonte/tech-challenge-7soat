import { Controller, Get } from '@nestjs/common';
import { CostumerService } from 'src/costumer/domain/inboundPorts/costumer.service';

@Controller('Costumer')
export class CostumerController {
  constructor(private costumerService: CostumerService) {}

  @Get()
  findAll() {
    return this.costumerService.findAll();
  }
}
