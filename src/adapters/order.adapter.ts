import { CustomerNotFoundError } from 'src/errors/customer-not-found.error';
import { DatabaseError } from 'src/errors/database.error';
import { InvalidOrderError } from 'src/errors/invalid-order.error';
import { OrderNotFoundError } from 'src/errors/order-not-found.error';
import { OrderProductNotFoundError } from 'src/errors/order-product-not-found.error';
import { ProductNotFoundError } from 'src/errors/product-not-found.error';
import { OrderAndProducts } from 'src/types/order-and-products.type';

// TODO should return product and customer objects instead of only its id?
export const OrderAdapter = {
  adaptArrayJson: (ordersAndProducts: OrderAndProducts[]): string => {
    if (ordersAndProducts === null) {
      return JSON.stringify({});
    }

    const mappedOrdersAndProducts = ordersAndProducts.map(
      (orderAndProducts) => {
        return {
          id: orderAndProducts.order.id,
          createdAt: orderAndProducts.order.createdAt,
          updatedAt: orderAndProducts.order.updatedAt,
          notes: orderAndProducts.order.notes,
          trackingId: orderAndProducts.order.trackingId,
          status: orderAndProducts.order.status,
          customerId: orderAndProducts.order.customerId,
          productsAndQuantity: orderAndProducts.productsAndQuantity,
        };
      },
    );

    return JSON.stringify(mappedOrdersAndProducts);
  },

  adaptJson: (orderAndProducts: OrderAndProducts | null): string => {
    if (orderAndProducts === null) {
      return JSON.stringify({});
    }

    const mappedOrder = {
      id: orderAndProducts.order.id,
      createdAt: orderAndProducts.order.createdAt,
      updatedAt: orderAndProducts.order.updatedAt,
      notes: orderAndProducts.order.notes,
      trackingId: orderAndProducts.order.trackingId,
      status: orderAndProducts.order.status,
      customerId: orderAndProducts.order.customerId,
      productsAndQuantity: orderAndProducts.productsAndQuantity,
    };

    return JSON.stringify(mappedOrder);
  },

  adaptError(error: Error): { code: number; message: string } {
    if (error instanceof InvalidOrderError) {
      return { code: 400, message: error.message };
    } else if (error instanceof OrderNotFoundError) {
      return { code: 404, message: error.message };
    } else if (error instanceof ProductNotFoundError) {
      return { code: 404, message: error.message };
    } else if (error instanceof CustomerNotFoundError) {
      return { code: 404, message: error.message };
    } else if (error instanceof OrderProductNotFoundError) {
      return { code: 404, message: error.message };
    } else if (error instanceof DatabaseError) {
      return { code: 500, message: error.message };
    } else {
      return { code: 500, message: 'Internal server error' };
    }
  },
};
