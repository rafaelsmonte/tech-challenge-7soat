import { OrderAndProductsAndPayment } from '../types/order-and-products-and-payment.type';
import { OrderAndProducts } from '../types/order-and-products.type';

export const OrderAdapter = {
  adaptArrayJson: (ordersAndProducts: OrderAndProducts[]): string => {
    const mappedOrdersAndProducts = ordersAndProducts.map(
      (orderAndProducts) => {
        const { order, productsWithQuantity, customer } = orderAndProducts;

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
          products: productsWithQuantity.map((productWithQuantity) => {
            return {
              id: productWithQuantity.product.getId(),
              createdAt: productWithQuantity.product.getCreatedAt(),
              updatedAt: productWithQuantity.product.getUpdatedAt(),
              name: productWithQuantity.product.getName(),
              price: productWithQuantity.product.getPrice(),
              description: productWithQuantity.product.getDescription(),
              pictures: productWithQuantity.product.getPictures(),
              categoryId: productWithQuantity.product.getCategoryId(),
              quantity: productWithQuantity.quantity,
            };
          }),
        };
      },
    );

    return JSON.stringify(mappedOrdersAndProducts);
  },

  adaptJson: (orderAndProducts: OrderAndProducts | null): string => {
    if (!orderAndProducts) return JSON.stringify({});

    const { order, productsWithQuantity, customer } = orderAndProducts;

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
      products: productsWithQuantity.map((productWithQuantity) => {
        return {
          id: productWithQuantity.product.getId(),
          createdAt: productWithQuantity.product.getCreatedAt(),
          updatedAt: productWithQuantity.product.getUpdatedAt(),
          name: productWithQuantity.product.getName(),
          price: productWithQuantity.product.getPrice(),
          description: productWithQuantity.product.getDescription(),
          pictures: productWithQuantity.product.getPictures(),
          categoryId: productWithQuantity.product.getCategoryId(),
          quantity: productWithQuantity.quantity,
        };
      }),
    };

    return JSON.stringify(mappedOrder);
  },

  adaptJsonWithPayment: (
    orderAndProductsAndPayment: OrderAndProductsAndPayment | null,
  ): string => {
    if (!orderAndProductsAndPayment) return JSON.stringify({});

    const { order, productsWithQuantity, payment, customer } =
      orderAndProductsAndPayment;

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
      products: productsWithQuantity.map((productWithQuantity) => {
        return {
          id: productWithQuantity.product.getId(),
          createdAt: productWithQuantity.product.getCreatedAt(),
          updatedAt: productWithQuantity.product.getUpdatedAt(),
          name: productWithQuantity.product.getName(),
          price: productWithQuantity.product.getPrice(),
          description: productWithQuantity.product.getDescription(),
          pictures: productWithQuantity.product.getPictures(),
          categoryId: productWithQuantity.product.getCategoryId(),
          quantity: productWithQuantity.quantity,
        };
      }),
    };

    return JSON.stringify(mappedOrder);
  },
};
