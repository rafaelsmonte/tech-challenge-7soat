import { Inject, Injectable } from '@nestjs/common';
import { ICostumerService } from './costumer-service.interface';
import { ICostumerRepository } from '../outboundPorts/costumer-repository.interface';
import { CostumerEntity } from '../model/costumer.entity';

@Injectable()
export class CostumerService implements ICostumerService {
  constructor(
    @Inject(ICostumerRepository)
    private readonly costumerRepository: ICostumerRepository,
  ) {}
  async findAll(): Promise<CostumerEntity[]> {
    return await this.costumerRepository.findAll();
  }
}
