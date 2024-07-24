import { OrderAndProducts } from 'src/types/order-and-products.type';

// TODO retornar todas as entidades associadas ou apenas seus IDs?
export const OrderAdapter = {
  adaptArrayJson: (ordersAndProducts: OrderAndProducts[]): string => {
    const mappedOrdersAndProducts = ordersAndProducts.map(
      (orderAndProducts) => {
        return {
          id: orderAndProducts.order.getId(),
          createdAt: orderAndProducts.order.getCreatedAt(),
          updatedAt: orderAndProducts.order.getUpdatedAt(),
          notes: orderAndProducts.order.getNotes(),
          trackingId: orderAndProducts.order.getTrackingId(),
          status: orderAndProducts.order.getStatus(),
          customerId: orderAndProducts.order.getCustomerId(),
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
      id: orderAndProducts.order.getId(),
      createdAt: orderAndProducts.order.getCreatedAt(),
      updatedAt: orderAndProducts.order.getUpdatedAt(),
      notes: orderAndProducts.order.getNotes(),
      trackingId: orderAndProducts.order.getTrackingId(),
      status: orderAndProducts.order.getStatus(),
      customerId: orderAndProducts.order.getCustomerId(),
      productsAndQuantity: orderAndProducts.productsAndQuantity,
    };

    return JSON.stringify(mappedOrder);
  },
};
