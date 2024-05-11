import { OrderProductEntity } from '../model/order-product.entity';

export interface IOrderProductService {
  findAll(): OrderProductEntity[];
}
