import { Inject, Injectable } from '@nestjs/common';
import { ICostumerService } from './costumer-service.interface';
import { ICostumerRepository } from '../outboundPorts/costumer-repository.interface';
import { CostumerEntity } from '../model/costumer.entity';
import { CreateCostumerDTO } from 'src/costumer/adapters/model/create-costumer.dto';
import { UpdateCostumerDTO } from 'src/costumer/adapters/model/update-costumer.dto';

@Injectable()
export class CostumerService implements ICostumerService {
  constructor(
    @Inject(ICostumerRepository)
    private readonly costumerRepository: ICostumerRepository,
  ) {}

  async create(costumerDTO: CreateCostumerDTO): Promise<CostumerEntity> {
    return await this.costumerRepository.create(costumerDTO);
  }

  async findAll(): Promise<CostumerEntity[]> {
    return await this.costumerRepository.findAll();
  }

  async delete(id: number): Promise<void> {
    return await this.costumerRepository.delete(id);
  }

  async update(
    id: number,
    costumerDTO: UpdateCostumerDTO,
  ): Promise<CostumerEntity> {
    return await this.costumerRepository.update(id, costumerDTO);
  }
}
