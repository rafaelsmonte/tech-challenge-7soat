import { Order } from '@entities/order.entity';
import { IDatabase } from '@interfaces/database.interface';
import { IOrderGateway } from '@interfaces/order.gateway.interface';
import { OrderProduct } from 'src/types/order-product.type';

// TODO implement
export class OrderGateway implements IOrderGateway {
  private _database: IDatabase;

  constructor(database: IDatabase) {
    this._database = database;
  }

  findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  create(
    orderProducts: OrderProduct[],
    notes: string,
    totalPrice: number,
    customerId?: number,
  ): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
