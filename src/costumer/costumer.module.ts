import { Module } from '@nestjs/common';
import { CostumerController } from './adapters/driving/costumer.controller';
import { CostumerService } from './domain/inboundPorts/costumer.service';
import { ICostumerRepository } from './domain/outboundPorts/costumer-repository.interface';
import { CostumerRepository } from './adapters/driven/costumer.repository';

@Module({
  controllers: [CostumerController],
  providers: [
    CostumerService,
    {
      provide: ICostumerRepository,
      useClass: CostumerRepository,
    },
  ],
})
export class CostumerModule {}
