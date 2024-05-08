import { Inject, Injectable } from '@nestjs/common';
import { ICostumerService } from './costumer-service.interface';
import { ICostumerRepository } from '../outboundPorts/costumer-repository.interface';
import { Costumer } from '../model/costumer';

@Injectable()
export class CostumerService implements ICostumerService {
  constructor(
    @Inject(ICostumerRepository)
    private readonly CostumerRepository: ICostumerRepository,
  ) {}
  findAll(): Costumer[] {
    throw new Error('Method not implemented.');
  }
}
