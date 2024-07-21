import { Customer } from 'src/entities/customer.entity';
import { OrderProduct } from 'src/entities/order-product.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { OrderStatus } from 'src/enum/order-status.enum';
import { CustomerGateway } from 'src/interfaces/customer.gateway.interface';
import { OrderProductGateway } from 'src/interfaces/order-product.gateway.interface';
import { OrderGateway } from 'src/interfaces/order.gateway.interface';
import { ProductGateway } from 'src/interfaces/product.gateway.interface';
import { OrderAndProducts } from 'src/types/order-and-products.type';
import { ProductAndQuantity } from 'src/types/product-and-quantity.type';

// TODO handle errors

// TODO return the associated entities or just their ids?

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

    if (!order) throw Error('Order not found');

    const orderProducts = await orderProductGateway.findByOrderId(order.id);

    orderProducts.forEach(({ productId, quantity }) => {
      productsAndQuantity.push({
        productId: productId,
        quantity: quantity,
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
  ): Promise<OrderAndProducts> {
    let customer: Customer | null;
    let products: Product[];
    let totalPrice = 0;

    if (customerId) {
      customer = await customerGateway.findById(customerId);

      if (!customer) throw Error('Customer not found!');
    }

    productsAndQuantity.forEach(async ({ productId, quantity }) => {
      const product = await productGateway.findById(productId);

      if (!product) throw Error('Product not found!');

      products.push(product);

      totalPrice += product.price * quantity;
    });

    const newOrder = await orderGateway.create(
      Order.new(notes, 0, totalPrice, OrderStatus.AWAITING, customerId),
    );

    productsAndQuantity.forEach(async ({ productId, quantity }) => {
      await orderProductGateway.create(
        OrderProduct.new(newOrder.id, productId, quantity),
      );
    });

    return { order: newOrder, productsAndQuantity };
  }

  static async delete(
    orderGateway: OrderGateway,
    orderProductGateway: OrderProductGateway,
    id: number,
  ): Promise<void> {
    await orderGateway.delete(id);
  }
}
