import { Costumer } from '../model/costumer';

export interface ICostumerRepository {
  findAll(): Costumer[];
}

export const ICostumerRepository = Symbol('ICostumerRepository');
