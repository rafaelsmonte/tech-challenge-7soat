import { Module } from '@nestjs/common';
import { CostumerController } from './adapters/driving/costumer.controller';
import { CostumerService } from './domain/inboundPorts/costumer.service';

@Module({
  controllers: [CostumerController],
  providers: [CostumerService],
})
export class CostumerModule {}
