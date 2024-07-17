import { Order } from '@entities/order.entity';
import { IDatabase } from '@interfaces/database.interface';
import { IOrderGateway } from '@interfaces/order.gateway.interface';

export class OrderGateway implements IOrderGateway {
  private _database: IDatabase;

  constructor(database: IDatabase) {
    this._database = database;
  }

  public async findAll(): Promise<Order | null> {
    return null; // TODO implement
  }
}
