import { Injectable } from '@nestjs/common';
import { Costumer } from 'src/costumer/domain/model/costumer';
import { ICostumerRepository } from 'src/costumer/domain/outboundPorts/costumer-repository.interface';

@Injectable()
export class CostumerRepository implements ICostumerRepository {
  findAll(): Costumer[] {
    throw new Error('Method not implemented.');
  }
}
