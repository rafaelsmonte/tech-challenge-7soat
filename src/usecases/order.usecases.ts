import { Customer } from 'src/entities/customer.entity';
import { OrderProduct } from 'src/entities/order-product.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { OrderStatus } from 'src/enum/order-status.enum';
import { CustomerNotFoundError } from 'src/errors/customer-not-found.error';
import { OrderNotFoundError } from 'src/errors/order-not-found.error';
import { ProductNotFoundError } from 'src/errors/product-not-found.error';
import { CustomerGateway } from 'src/interfaces/customer.gateway.interface';
import { OrderProductGateway } from 'src/interfaces/order-product.gateway.interface';
import { OrderGateway } from 'src/interfaces/order.gateway.interface';
import { ProductGateway } from 'src/interfaces/product.gateway.interface';
import { OrderAndProducts } from 'src/types/order-and-products.type';
import { ProductAndQuantity } from 'src/types/product-and-quantity.type';

// TODO retornar todas as entidades associadas ou apenas seus IDs?
// TODO como utilizar transaction nesse cenário de queries encadeadas?

export class OrderUseCases {
  static async findAll(
    orderGateway: OrderGateway,
    productGateway: ProductGateway,
    customerGateway: CustomerGateway,
    orderProductGateway: OrderProductGateway,
  ): Promise<OrderAndProducts[]> {
    const orderAndProducts: OrderAndProducts[] = [];

    const orders = await orderGateway.findAll();

    for (const order of orders) {
      const orderProducts = await orderProductGateway.findByOrderId(
        order.getId(),
      );

      const productsAndQuantity: ProductAndQuantity[] = [];

      orderProducts.forEach((orderProduct) => {
        productsAndQuantity.push({
          productId: orderProduct.getProductId(),
          quantity: orderProduct.getQuantity(),
        });
      });

      orderAndProducts.push({ order, productsAndQuantity });
    }

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

    if (!order) throw new OrderNotFoundError('Order not found');

    const orderProducts = await orderProductGateway.findByOrderId(
      order.getId(),
    );

    orderProducts.forEach((orderProduct) => {
      productsAndQuantity.push({
        productId: orderProduct.getProductId(),
        quantity: orderProduct.getQuantity(),
      });
    });

    return { order, productsAndQuantity };
  }

  static async create(
    orderGateway: OrderGateway,
    productGateway: ProductGateway,
    customerGateway: CustomerGateway,
    orderProductGateway: OrderProductGateway,
    productsAndQuantity: ProductAndQuantity[],
    notes: string,
    customerId?: number,
  ): Promise<OrderAndProducts> {
    let customer: Customer | null = null;
    let products: Product[] = [];
    let totalPrice = 0;

    if (customerId) {
      customer = await customerGateway.findById(customerId);

      if (!customer) throw new CustomerNotFoundError('Customer not found!');
    }

    for (const { productId, quantity } of productsAndQuantity) {
      const product = await productGateway.findById(productId);

      if (!product) throw new ProductNotFoundError('Product not found!');

      products.push(product);

      totalPrice += product.getPrice() * quantity;
    }

    // TODO create payment

    const newOrder = await orderGateway.create(
      Order.new(notes, 0, totalPrice, OrderStatus.AWAITING, customerId),
    );

    for (const { productId, quantity } of productsAndQuantity) {
      await orderProductGateway.create(
        OrderProduct.new(newOrder.getId(), productId, quantity),
      );
    }

    return { order: newOrder, productsAndQuantity };
  }

  static async update(
    orderGateway: OrderGateway,
    productGateway: ProductGateway,
    customerGateway: CustomerGateway,
    orderProductGateway: OrderProductGateway,
    id: number,
    status: string,
  ): Promise<OrderAndProducts> {
    const productsAndQuantity: ProductAndQuantity[] = [];

    const order = await orderGateway.findById(id);

    if (!order) throw new OrderNotFoundError('Order not found');

    const orderProducts = await orderProductGateway.findByOrderId(
      order.getId(),
    );

    orderProducts.forEach((orderProduct) => {
      productsAndQuantity.push({
        productId: orderProduct.getProductId(),
        quantity: orderProduct.getQuantity(),
      });
    });

    order.setStatus(status);

    const updatedOrder = await orderGateway.updateStatus(order);

    return { order: updatedOrder, productsAndQuantity };
  }

  static async delete(
    orderGateway: OrderGateway,
    orderProductGateway: OrderProductGateway,
    id: number,
  ): Promise<void> {
    const order = await orderGateway.findById(id);

    if (!order) throw new OrderNotFoundError('Order not found');

    await orderGateway.delete(id);
  }
}
