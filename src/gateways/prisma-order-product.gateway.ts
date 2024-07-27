import { OrderProduct } from 'src/entities/order-product.entity';
import { Database } from 'src/interfaces/database.interface';
import { OrderProductGateway } from 'src/interfaces/order-product.gateway.interface';

export class PrismaOrderProductGateway implements OrderProductGateway {
  constructor(private database: Database) {}

  async findByOrderId(orderId: number): Promise<OrderProduct[]> {
    return this.database.findOrderProductsByOrderId(orderId);
  }

  async create(orderProduct: OrderProduct): Promise<OrderProduct> {
    return this.database.createOrderProduct(orderProduct);
  }

  async delete(id: number): Promise<void> {
    return this.database.deleteOrderProduct(id);
  }
}
