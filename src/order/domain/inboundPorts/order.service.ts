import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../outboundPorts/order-repository.interface';
import { IOrderService } from './order-service.interface';
import { OrderEntity } from '../model/order.entity';
import { CreateOrderDTO } from 'src/order/adapters/model/create-order.dto';
import { UpdateOrderDTO } from 'src/order/adapters/model/update-order.dto';
import { IProductRepository } from 'src/product/domain/outboundPorts/product-repository.interface';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}
  async create(orderDTO: CreateOrderDTO): Promise<OrderEntity> {
    const productIds = orderDTO.orderProducts.map(
      (orderProduct) => orderProduct.productId,
    );

    const products = await this.productRepository.list({ ids: productIds });

    const totalPrice = orderDTO.orderProducts.reduce((acc, orderProduct) => {
      const product = products.find((p) => p.id === orderProduct.productId);
      return acc + (product?.price?.toNumber() ?? 0) * orderProduct.quantity;
    }, 0);

    return await this.orderRepository.create(orderDTO, totalPrice);
  }

  async list(): Promise<OrderEntity[]> {
    return await this.orderRepository.list();
  }

  async retrieve(id: number): Promise<OrderEntity> {
    return await this.orderRepository.retrieve(id);
  }

  async delete(id: number): Promise<void> {
    return await this.orderRepository.delete(id);
  }

  async update(id: number, orderDTO: UpdateOrderDTO): Promise<OrderEntity> {
    return await this.orderRepository.update(id, orderDTO);
  }
}
