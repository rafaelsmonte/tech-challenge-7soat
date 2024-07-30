import { OrderAndProductsAndPayment } from '../types/order-and-products-and-payment.type';
import { OrderAndProducts } from '../types/order-and-products.type';

// TODO retornar todas as entidades associadas ou apenas seus IDs?
export const OrderAdapter = {
  adaptArrayJson: (ordersAndProducts: OrderAndProducts[]): string => {
    const mappedOrdersAndProducts = ordersAndProducts.map(
      (orderAndProducts) => {
        const { order, productsAndQuantity } = orderAndProducts;

        return {
          id: order.getId(),
          createdAt: order.getCreatedAt(),
          updatedAt: order.getUpdatedAt(),
          notes: order.getNotes(),
          trackingId: order.getTrackingId(),
          totalPrice: order.getTotalPrice(),
          status: order.getStatus(),
          customerId: order.getCustomerId(),
          productsAndQuantity: productsAndQuantity,
        };
      },
    );

    return JSON.stringify(mappedOrdersAndProducts);
  },

  adaptJson: (orderAndProducts: OrderAndProducts | null): string => {
    if (!orderAndProducts) return JSON.stringify({});

    const { order, productsAndQuantity } = orderAndProducts;

    const mappedOrder = {
      id: order.getId(),
      createdAt: order.getCreatedAt(),
      updatedAt: order.getUpdatedAt(),
      notes: order.getNotes(),
      trackingId: order.getTrackingId(),
      totalPrice: order.getTotalPrice(),
      status: order.getStatus(),
      customerId: order.getCustomerId(),
      productsAndQuantity: productsAndQuantity,
    };

    return JSON.stringify(mappedOrder);
  },

  adaptJsonWithPayment: (
    orderAndProductsAndPayment: OrderAndProductsAndPayment | null,
  ): string => {
    if (!orderAndProductsAndPayment) return JSON.stringify({});

    const { order, productsAndQuantity, payment } = orderAndProductsAndPayment;

    const mappedOrder = {
      id: order.getId(),
      createdAt: order.getCreatedAt(),
      updatedAt: order.getUpdatedAt(),
      notes: order.getNotes(),
      trackingId: order.getTrackingId(),
      totalPrice: order.getTotalPrice(),
      status: order.getStatus(),
      customerId: order.getCustomerId(),
      productsAndQuantity: productsAndQuantity,
      payment: {
        id: payment.getId(),
        pixQrCode: payment.getPixQrCode(),
        pixQrCodeBase64: payment.getPixQrCodeBase64(),
      },
    };

    return JSON.stringify(mappedOrder);
  },
};
