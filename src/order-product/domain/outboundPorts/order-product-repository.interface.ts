import { OrderProductEntity } from '../model/order-product.entity';

export interface IOrderProductRepository {
  findAll(): OrderProductEntity[];
}

export const IOrderProductRepository = Symbol('IOrderProductRepository');
