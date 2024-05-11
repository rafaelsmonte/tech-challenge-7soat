import { Inject, Injectable } from '@nestjs/common';
import { OrderProductEntity } from '../model/order-product.entity';
import { IOrderProductRepository } from '../outboundPorts/order-product-repository.interface';
import { IOrderProductService } from './order-product-service.interface';

@Injectable()
export class OrderProductService implements IOrderProductService {
  constructor(
    @Inject(IOrderProductRepository)
    private readonly orderProductRepository: IOrderProductRepository,
  ) {}
  findAll(): OrderProductEntity[] {
    throw new Error('Method not implemented.');
  }
}
