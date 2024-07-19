import { Order } from '@entities/order.entity';
import { IDatabase } from '@interfaces/database.interface';
import { OrderGateway } from '@interfaces/order.gateway.interface';
import { ProductAndQuantity } from 'src/types/product-and-quantity.type';

// TODO implement
export class PrismaOrderGateway implements OrderGateway {
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
    productsAndQuantity: ProductAndQuantity[],
    notes: string,
    totalPrice: number,
    trackingId: string,
    status: string,
    customerId?: number,
  ): Promise<Order> {
    // TODO return object, void or id
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
