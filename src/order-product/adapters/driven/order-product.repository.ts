import { Injectable } from '@nestjs/common';
import { OrderProductEntity } from 'src/order-product/domain/model/order-product.entity';
import { IOrderProductRepository } from 'src/order-product/domain/outboundPorts/order-product-repository.interface';

@Injectable()
export class OrderProductRepository implements IOrderProductRepository {
  findAll(): OrderProductEntity[] {
    throw new Error('Method not implemented.');
  }
}
