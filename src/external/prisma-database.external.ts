import {
  PrismaClient,
  Category as PrismaCategory,
  Customer as PrismaCustomer,
  Product as PrismaProduct,
  Order as PrismaOrder,
  OrderProduct as PrismaOrderProduct,
  OrderStatus as PrismaOrderStatus,
  Prisma,
} from '@prisma/client';
import Decimal from 'decimal.js';
import { Category } from 'src/entities/category.entity';
import { Customer } from 'src/entities/customer.entity';
import { OrderProduct } from 'src/entities/order-product.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { DatabaseError } from 'src/errors/database.error';
import { IDatabase } from 'src/interfaces/database.interface';

export class PrismaDatabase implements IDatabase {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async findAllCategories(): Promise<Category[]> {
    try {
      const categories: PrismaCategory[] =
        await this.prismaClient.category.findMany();

      return categories.map(
        (category) =>
          new Category(
            category.id,
            category.createdAt,
            category.updatedAt,
            category.type,
          ),
      );
    } catch (error) {
      throw new DatabaseError('Failed to find categories');
    }
  }

  async findCategoryById(id: number): Promise<Category | null> {
    try {
      const category: PrismaCategory =
        await this.prismaClient.category.findUnique({
          where: { id },
        });

      if (!category) return null;

      return new Category(
        category.id,
        category.createdAt,
        category.updatedAt,
        category.type,
      );
    } catch (error) {
      throw new DatabaseError('Failed to find category');
    }
  }

  async findAllCustomers(): Promise<Customer[]> {
    try {
      const customers: PrismaCustomer[] =
        await this.prismaClient.customer.findMany();

      return customers.map(
        (customer) =>
          new Customer(
            customer.id,
            customer.createdAt,
            customer.updatedAt,
            customer.name,
            customer.taxpayerRegistry,
            customer.email,
          ),
      );
    } catch (error) {
      throw new DatabaseError('Failed to find customers');
    }
  }

  async findCustomerByTaxpayerRegistry(
    taxpayerRegistry: string,
  ): Promise<Customer | null> {
    try {
      const customer: PrismaCustomer =
        await this.prismaClient.customer.findUnique({
          where: { taxpayerRegistry },
        });

      if (!customer) return null;

      return new Customer(
        customer.id,
        customer.createdAt,
        customer.updatedAt,
        customer.name,
        customer.taxpayerRegistry,
        customer.email,
      );
    } catch (error) {
      throw new DatabaseError('Failed to find customer');
    }
  }

  async findCustomerById(id: number): Promise<Customer | null> {
    try {
      const customer: PrismaCustomer =
        await this.prismaClient.customer.findUnique({
          where: { id },
        });

      if (!customer) return null;

      return new Customer(
        customer.id,
        customer.createdAt,
        customer.updatedAt,
        customer.name,
        customer.taxpayerRegistry,
        customer.email,
      );
    } catch (error) {
      throw new DatabaseError('Failed to find customer');
    }
  }

  async saveCustomer(customer: Customer): Promise<Customer> {
    try {
      const createdCustomer: PrismaCustomer =
        await this.prismaClient.customer.create({
          data: {
            name: customer.getName(),
            taxpayerRegistry: customer.getTaxpayerRegistry(),
            email: customer.getEmail(),
          },
        });

      return new Customer(
        createdCustomer.id,
        createdCustomer.createdAt,
        createdCustomer.updatedAt,
        createdCustomer.name,
        createdCustomer.taxpayerRegistry,
        createdCustomer.email,
      );
    } catch (error) {
      throw new DatabaseError('Failed to save customer');
    }
  }

  async deleteCustomer(id: number): Promise<void> {
    try {
      await this.prismaClient.customer.delete({ where: { id } });
    } catch (error) {
      throw new DatabaseError('Failed to delete customer');
    }
  }

  async findAllProducts(): Promise<Product[]> {
    try {
      const products: PrismaProduct[] =
        await this.prismaClient.product.findMany();

      return products.map(
        (product) =>
          new Product(
            product.id,
            product.createdAt,
            product.updatedAt,
            product.name,
            new Decimal(product.price).toNumber(),
            product.description,
            product.pictures,
            product.categoryId,
          ),
      );
    } catch (error) {
      throw new DatabaseError('Failed to find products');
    }
  }

  async findProductById(id: number): Promise<Product | null> {
    try {
      const product: PrismaProduct = await this.prismaClient.product.findUnique(
        {
          where: { id },
        },
      );

      if (!product) return null;

      return new Product(
        product.id,
        product.createdAt,
        product.updatedAt,
        product.name,
        new Decimal(product.price).toNumber(),
        product.description,
        product.pictures,
        product.categoryId,
      );
    } catch (error) {
      throw new DatabaseError('Failed to find product');
    }
  }

  async saveProduct(product: Product): Promise<Product> {
    try {
      const createdProduct: PrismaProduct =
        await this.prismaClient.product.create({
          data: {
            name: product.getName(),
            price: new Prisma.Decimal(product.getPrice()),
            description: product.getDescription(),
            pictures: product.getPictures(),
            categoryId: product.getCategoryId(),
          },
        });

      return new Product(
        createdProduct.id,
        createdProduct.createdAt,
        createdProduct.updatedAt,
        createdProduct.name,
        new Decimal(product.getPrice()).toNumber(),
        createdProduct.description,
        createdProduct.pictures,
        createdProduct.categoryId,
      );
    } catch (error) {
      throw new DatabaseError('Failed to save product');
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await this.prismaClient.product.delete({ where: { id } });
    } catch (error) {
      throw new DatabaseError('Failed to delete product');
    }
  }

  async findAllOrders(): Promise<Order[]> {
    try {
      const orders: PrismaOrder[] = await this.prismaClient.order.findMany();

      return orders.map(
        (order) =>
          new Order(
            order.id,
            order.createdAt,
            order.updatedAt,
            order.notes,
            order.trackingId,
            new Decimal(order.totalPrice).toNumber(),
            order.status,
            Number(order.paymentId),
            order.customerId,
          ),
      );
    } catch (error) {
      throw new DatabaseError('Failed to find orders');
    }
  }

  async findOrderById(id: number): Promise<Order | null> {
    try {
      const order: PrismaOrder = await this.prismaClient.order.findUnique({
        where: { id },
      });

      if (!order) return null;

      return new Order(
        order.id,
        order.createdAt,
        order.updatedAt,
        order.notes,
        order.trackingId,
        new Decimal(order.totalPrice).toNumber(),
        order.status,
        Number(order.paymentId),
        order.customerId,
      );
    } catch (error) {
      throw new DatabaseError('Failed to find order');
    }
  }

  async findOrderByPaymentId(paymentId: number): Promise<Order | null> {
    try {
      const order: PrismaOrder = await this.prismaClient.order.findUnique({
        where: { paymentId },
      });

      if (!order) return null;

      return new Order(
        order.id,
        order.createdAt,
        order.updatedAt,
        order.notes,
        order.trackingId,
        new Decimal(order.totalPrice).toNumber(),
        order.status,
        Number(order.paymentId),
        order.customerId,
      );
    } catch (error) {
      throw new DatabaseError('Failed to find order');
    }
  }

  async createOrder(order: Order): Promise<Order> {
    try {
      const createdOrder: PrismaOrder = await this.prismaClient.order.create({
        data: {
          notes: order.getNotes(),
          trackingId: order.getTrackingId(),
          totalPrice: new Prisma.Decimal(order.getTotalPrice()),
          status: PrismaOrderStatus.PAYMENT_PENDING,
          paymentId: order.getPaymentId(),
          customerId: order.getCustomerId(),
        },
      });

      return new Order(
        createdOrder.id,
        createdOrder.createdAt,
        createdOrder.updatedAt,
        createdOrder.notes,
        createdOrder.trackingId,
        new Decimal(createdOrder.totalPrice).toNumber(),
        createdOrder.status,
        Number(createdOrder.paymentId),
        createdOrder.customerId,
      );
    } catch (error) {
      throw new DatabaseError('Failed to save order');
    }
  }

  async updateOrderStatus(order: Order): Promise<Order> {
    try {
      const updatedOrder: PrismaOrder = await this.prismaClient.order.update({
        where: {
          id: order.getId(),
        },
        data: {
          status: PrismaOrderStatus[order.getStatus()],
        },
      });

      return new Order(
        updatedOrder.id,
        updatedOrder.createdAt,
        updatedOrder.updatedAt,
        updatedOrder.notes,
        updatedOrder.trackingId,
        new Decimal(updatedOrder.totalPrice).toNumber(),
        updatedOrder.status,
        Number(updatedOrder.paymentId),
        updatedOrder.customerId,
      );
    } catch (error) {
      throw new DatabaseError('Failed to update order');
    }
  }

  async deleteOrder(id: number): Promise<void> {
    try {
      await this.prismaClient.order.delete({ where: { id } });
    } catch (error) {
      throw new DatabaseError('Failed to delete order');
    }
  }

  async findOrderProductsByOrderId(orderId: number): Promise<OrderProduct[]> {
    try {
      const orderProducts: PrismaOrderProduct[] =
        await this.prismaClient.orderProduct.findMany({
          where: { orderId },
        });

      return orderProducts.map(
        (orderProduct) =>
          new OrderProduct(
            orderProduct.id,
            orderProduct.createdAt,
            orderProduct.updatedAt,
            orderProduct.orderId,
            orderProduct.productId,
            orderProduct.quantity,
          ),
      );
    } catch (error) {
      throw new DatabaseError('Failed to find orderProducts');
    }
  }

  async createOrderProduct(orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const createdOrderProduct: PrismaOrderProduct =
        await this.prismaClient.orderProduct.create({
          data: {
            orderId: orderProduct.getOrderId(),
            productId: orderProduct.getProductId(),
            quantity: orderProduct.getQuantity(),
          },
        });

      return new OrderProduct(
        createdOrderProduct.id,
        createdOrderProduct.createdAt,
        createdOrderProduct.updatedAt,
        createdOrderProduct.orderId,
        createdOrderProduct.productId,
        createdOrderProduct.quantity,
      );
    } catch (error) {
      throw new DatabaseError('Failed to save orderProducts');
    }
  }

  async deleteOrderProduct(id: number): Promise<void> {
    try {
      await this.prismaClient.orderProduct.delete({ where: { id } });
    } catch (error) {
      throw new DatabaseError('Failed to delete orderProducts');
    }
  }
}
