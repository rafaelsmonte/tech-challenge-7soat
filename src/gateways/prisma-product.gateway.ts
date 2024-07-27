import { Product } from 'src/entities/product.entity';
import { Database } from 'src/interfaces/database.interface';
import { ProductGateway } from 'src/interfaces/product.gateway.interface';

export class PrismaProductGateway implements ProductGateway {
  constructor(private database: Database) {}

  public async findAll(): Promise<Product[]> {
    return this.database.findAllProducts();
  }

  public async findById(id: number): Promise<Product | null> {
    return this.database.findProductById(id);
  }

  public async create(product: Product): Promise<Product> {
    return this.database.saveProduct(product);
  }

  public async delete(id: number): Promise<void> {
    return this.database.deleteProduct(id);
  }
}
