import { Order } from 'src/entities/order.entity';
import { Database } from 'src/interfaces/database.interface';
import { OrderGateway } from 'src/interfaces/order.gateway.interface';

export class PrismaOrderGateway implements OrderGateway {
  constructor(private database: Database) {}

  // TODO add parameters
  async findAll(): Promise<Order[]> {
    return this.database.findAllOrders();
  }

  async findById(id: number): Promise<Order | null> {
    return this.database.findOrderById(id);
  }

  async create(order: Order): Promise<Order> {
    return this.database.createOrder(order);
  }

  async updateStatus(order: Order): Promise<Order> {
    return this.database.updateOrderStatus(order);
  }

  async delete(id: number): Promise<void> {
    return this.database.deleteOrder(id);
  }
}
