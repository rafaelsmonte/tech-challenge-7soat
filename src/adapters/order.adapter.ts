import { OrderDetail } from 'src/types/order-detail.type';
import { OrderDetailWithPayment } from '../types/order-detail-with-payment.type';

export const OrderAdapter = {
  adaptArrayJson: (ordersDetail: OrderDetail[]): string => {
    const mappedOrdersAndProducts = ordersDetail.map((orderDetail) => {
      const { order, productsDetailWithQuantity, customer } = orderDetail;

      return {
        id: order.getId(),
        createdAt: order.getCreatedAt(),
        updatedAt: order.getUpdatedAt(),
        notes: order.getNotes(),
        trackingId: order.getTrackingId(),
        totalPrice: order.getTotalPrice(),
        status: order.getStatus(),
        customer: customer
          ? {
              id: customer.getId(),
              name: customer.getName(),
              taxpayerRegistry: customer.getTaxpayerRegistry(),
              email: customer.getEmail(),
            }
          : null,
        products: productsDetailWithQuantity.map(
          (productDetailWithQuantity) => {
            return {
              id: productDetailWithQuantity.product.getId(),
              createdAt: productDetailWithQuantity.product.getCreatedAt(),
              updatedAt: productDetailWithQuantity.product.getUpdatedAt(),
              name: productDetailWithQuantity.product.getName(),
              price: productDetailWithQuantity.product.getPrice(),
              description: productDetailWithQuantity.product.getDescription(),
              pictures: productDetailWithQuantity.product.getPictures(),
              categoryId: productDetailWithQuantity.product.getCategoryId(),
              quantity: productDetailWithQuantity.quantity,
            };
          },
        ),
      };
    });

    return JSON.stringify(mappedOrdersAndProducts);
  },

  adaptJson: (orderDetail: OrderDetail | null): string => {
    if (!orderDetail) return JSON.stringify({});

    const { order, productsDetailWithQuantity, customer } = orderDetail;

    const mappedOrder = {
      id: order.getId(),
      createdAt: order.getCreatedAt(),
      updatedAt: order.getUpdatedAt(),
      notes: order.getNotes(),
      trackingId: order.getTrackingId(),
      totalPrice: order.getTotalPrice(),
      status: order.getStatus(),
      customer: customer
        ? {
            id: customer.getId(),
            name: customer.getName(),
            taxpayerRegistry: customer.getTaxpayerRegistry(),
            email: customer.getEmail(),
          }
        : null,
      products: productsDetailWithQuantity.map((productDetailWithQuantity) => {
        return {
          id: productDetailWithQuantity.product.getId(),
          createdAt: productDetailWithQuantity.product.getCreatedAt(),
          updatedAt: productDetailWithQuantity.product.getUpdatedAt(),
          name: productDetailWithQuantity.product.getName(),
          price: productDetailWithQuantity.product.getPrice(),
          description: productDetailWithQuantity.product.getDescription(),
          pictures: productDetailWithQuantity.product.getPictures(),
          categoryId: productDetailWithQuantity.product.getCategoryId(),
          quantity: productDetailWithQuantity.quantity,
        };
      }),
    };

    return JSON.stringify(mappedOrder);
  },

  adaptJsonWithPayment: (
    orderDetailWithPayment: OrderDetailWithPayment | null,
  ): string => {
    if (!orderDetailWithPayment) return JSON.stringify({});

    const { order, productsDetailWithQuantity, payment, customer } =
      orderDetailWithPayment;

    const mappedOrder = {
      id: order.getId(),
      createdAt: order.getCreatedAt(),
      updatedAt: order.getUpdatedAt(),
      notes: order.getNotes(),
      trackingId: order.getTrackingId(),
      totalPrice: order.getTotalPrice(),
      status: order.getStatus(),
      customer: customer
        ? {
            id: customer.getId(),
            name: customer.getName(),
            taxpayerRegistry: customer.getTaxpayerRegistry(),
            email: customer.getEmail(),
          }
        : null,
      payment: {
        id: payment.getId(),
        pixQrCode: payment.getPixQrCode(),
        pixQrCodeBase64: payment.getPixQrCodeBase64(),
      },
      products: productsDetailWithQuantity.map((productDetailWithQuantity) => {
        return {
          id: productDetailWithQuantity.product.getId(),
          createdAt: productDetailWithQuantity.product.getCreatedAt(),
          updatedAt: productDetailWithQuantity.product.getUpdatedAt(),
          name: productDetailWithQuantity.product.getName(),
          price: productDetailWithQuantity.product.getPrice(),
          description: productDetailWithQuantity.product.getDescription(),
          pictures: productDetailWithQuantity.product.getPictures(),
          categoryId: productDetailWithQuantity.product.getCategoryId(),
          quantity: productDetailWithQuantity.quantity,
        };
      }),
    };

    return JSON.stringify(mappedOrder);
  },
};
