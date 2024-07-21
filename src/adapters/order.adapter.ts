import { OrderAndProducts } from 'src/types/order-and-products.type';

// TODO should return product and customer objects instead of only its id?
export const OrderAdapter = {
  adaptArrayJson: (ordersAndProducts: OrderAndProducts[] | null): string => {
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
};
