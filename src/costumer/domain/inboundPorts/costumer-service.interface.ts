import { CostumerEntity } from '../model/costumer.entity';

export interface ICostumerService {
  findAll(): Promise<CostumerEntity[]>;
}
