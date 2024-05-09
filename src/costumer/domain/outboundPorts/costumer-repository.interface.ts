import { CostumerEntity } from '../model/costumer.entity';

export interface ICostumerRepository {
  findAll(): Promise<CostumerEntity[]>;
}

export const ICostumerRepository = Symbol('ICostumerRepository');
