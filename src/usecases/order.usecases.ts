import { Customer } from '@entities/customer.entity';
import { Order } from '@entities/order.entity';
import { Product } from '@entities/product.entity';
import { ICustomerGateway } from '@interfaces/customer.gateway.interface';
import { IOrderGateway } from '@interfaces/order.gateway.interface';
import { IProductGateway } from '@interfaces/product.gateway.interface';
import { OrderProduct } from 'src/types/order-product.type';

// TODO handle errors

export class OrderUseCases {
  static async findAll(
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    customerGateway: ICustomerGateway,
  ): Promise<Order[]> {
    return await orderGateway.findAll();
  }

  static async findById(
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    customerGateway: ICustomerGateway,
    id: number,
  ): Promise<Order> {
    return await orderGateway.findById(id);
  }

  // TODO use a transaction
  static async create(
    orderGateway: IOrderGateway,
    productGateway: IProductGateway,
    customerGateway: ICustomerGateway,
    orderProducts: OrderProduct[],
    notes: string,
    customerId?: number,
  ): Promise<Order> {
    let customer: Customer;
    let products: Product[];
    let totalPrice = 0;

    if (customerId) {
      customer = await customerGateway.findById(customerId);

      if (!customer) throw Error('Customer not found!');
    }

    orderProducts.forEach(async (orderProduct) => {
      const product = await productGateway.findById(orderProduct.productId);

      if (!product) throw Error('Product not found!');

      products.push(product);

      totalPrice += product.price * orderProduct.quantity;
    });

    const order = await orderGateway.create(
      orderProducts,
      notes,
      totalPrice,
      'trackingId',
      'status',
      customerId,
    );

    // TODO how is the better way to interact with OrderProduct table?
    orderProducts.forEach((orderProduct) => {});

    return order;
  }

  static async delete(orderGateway: IOrderGateway, id: number): Promise<void> {
    await orderGateway.delete(id);
  }
}
