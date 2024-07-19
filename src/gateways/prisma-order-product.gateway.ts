import { OrderProduct } from '@entities/order-product.entity';
import { IDatabase } from '@interfaces/database.interface';
import { OrderProductGateway } from '@interfaces/order-product.gateway.interface';

export class PrismaOrderProductGateway implements OrderProductGateway {
  private _database: IDatabase;

  constructor(database: IDatabase) {
    this._database = database;
  }

  findByOrderId(id: number): Promise<OrderProduct[]> {
    throw new Error('Method not implemented.');
  }

  create(
    orderId: number,
    productId: number,
    quantity: number,
  ): Promise<OrderProduct> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
