import { Customer } from '@entities/customer.entity';
import { Order } from '@entities/order.entity';
import { Product } from '@entities/product.entity';
import { CustomerGateway } from '@interfaces/customer.gateway.interface';
import { OrderProductGateway } from '@interfaces/order-product.gateway.interface';
import { OrderGateway } from '@interfaces/order.gateway.interface';
import { ProductGateway } from '@interfaces/product.gateway.interface';
import { OrderAndProducts } from 'src/types/order-and-products.type';
import { ProductAndQuantity } from 'src/types/product-and-quantity.type';

// TODO handle errors

export class OrderUseCases {
  static async findAll(
    orderGateway: OrderGateway,
    productGateway: ProductGateway,
    customerGateway: CustomerGateway,
    orderProductGateway: OrderProductGateway,
  ): Promise<OrderAndProducts[]> {
    const orderAndProducts: OrderAndProducts[] = [];
    const productsAndQuantity: ProductAndQuantity[] = [];

    const orders = await orderGateway.findAll();

    orders.forEach(async (order) => {
      const orderProducts = await orderProductGateway.findByOrderId(order.id);

      orderProducts.forEach(async (orderProduct) => {
        productsAndQuantity.push({
          productId: orderProduct.productId,
          quantity: orderProduct.quantity,
        });
      });

      orderAndProducts.push({ order, productsAndQuantity });
    });

    return orderAndProducts;
  }

  static async findById(
    orderGateway: OrderGateway,
    productGateway: ProductGateway,
    customerGateway: CustomerGateway,
    orderProductGateway: OrderProductGateway,
    id: number,
  ): Promise<OrderAndProducts> {
    const productsAndQuantity: ProductAndQuantity[] = [];

    const order = await orderGateway.findById(id);

    const orderProducts = await orderProductGateway.findByOrderId(order.id);

    orderProducts.forEach(async (orderProduct) => {
      productsAndQuantity.push({
        productId: orderProduct.productId,
        quantity: orderProduct.quantity,
      });
    });

    return { order, productsAndQuantity };
  }

  // TODO use a transaction
  static async create(
    orderGateway: OrderGateway,
    productGateway: ProductGateway,
    customerGateway: CustomerGateway,
    orderProductGateway: OrderProductGateway,
    productsAndQuantity: ProductAndQuantity[],
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

    productsAndQuantity.forEach(async (productAndQuantity) => {
      const product = await productGateway.findById(
        productAndQuantity.productId,
      );

      if (!product) throw Error('Product not found!');

      products.push(product);

      totalPrice += product.price * productAndQuantity.quantity;
    });

    const order = await orderGateway.create(
      productsAndQuantity,
      notes,
      totalPrice,
      'trackingId',
      'status',
      customerId,
    );

    // TODO how is the better way to interact with OrderProduct table?
    productsAndQuantity.forEach((productAndQuantity) => {});

    return order;
  }

  static async delete(
    orderGateway: OrderGateway,
    orderProductGateway: OrderProductGateway,
    id: number,
  ): Promise<void> {
    await orderGateway.delete(id);
  }
}
