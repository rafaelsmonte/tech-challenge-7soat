import { Costumer } from '../model/costumer';

export interface ICostumerService {
  findAll(): Costumer[];
}
