import { CreateCostumerDTO } from 'src/costumer/adapters/model/create-costumer.dto';
import { CostumerEntity } from '../model/costumer.entity';
import { UpdateCostumerDTO } from 'src/costumer/adapters/model/update-costumer.dto';

export interface ICostumerRepository {
  list(): Promise<CostumerEntity[]>;
  retrieve(id: number): Promise<CostumerEntity>;
  create(costumerDTO: CreateCostumerDTO): Promise<CostumerEntity>;
  delete(id: number): Promise<void>;
  update(id: number, costumerDTO: UpdateCostumerDTO): Promise<CostumerEntity>;
}

export const ICostumerRepository = Symbol('ICostumerRepository');
