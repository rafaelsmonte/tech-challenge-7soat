import { Category } from 'src/entities/category.entity';
import { Customer } from 'src/entities/customer.entity';
import { OrderProduct } from 'src/entities/order-product.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';

export interface IDatabase {
  // Category
  findAllCategories(): Promise<Category[]>;
  findCategoryById(id: number): Promise<Category | null>;

  // Customer
  findAllCustomers(): Promise<Customer[]>;
  findCustomerByTaxpayerRegistry(
    taxpayerRegistry: string,
  ): Promise<Customer | null>;
  findCustomerById(id: number): Promise<Customer | null>;
  saveCustomer(customer: Customer): Promise<Customer>;
  deleteCustomer(id: number): Promise<void>;

  // Product
  findAllProducts(): Promise<Product[]>;
  findProductById(id: number): Promise<Product | null>;
  saveProduct(product: Product): Promise<Product>;
  deleteProduct(id: number): Promise<void>;

  // Order
  findAllOrders(): Promise<Order[]>;
  findOrderById(id: number): Promise<Order | null>;
  findOrderByPaymentId(paymentId: number): Promise<Order | null>;
  createOrder(order: Order): Promise<Order>;
  updateOrderStatus(order: Order): Promise<Order>;
  deleteOrder(id: number): Promise<void>;

  // OrderProduct
  findOrderProductsByOrderId(orderId: number): Promise<OrderProduct[]>;
  createOrderProduct(orderProduct: OrderProduct): Promise<OrderProduct>;
  deleteOrderProduct(id: number): Promise<void>;
}
