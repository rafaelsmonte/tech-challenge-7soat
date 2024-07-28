import { ProductAndCategory } from '../types/product-and-category.type';

export const ProductAdapter = {
  adaptArrayJson: (productsAndCategory: ProductAndCategory[]): string => {
    const mappedProducts = productsAndCategory.map((productAndCategory) => {
      return {
        id: productAndCategory.product.getId(),
        createdAt: productAndCategory.product.getCreatedAt(),
        updatedAt: productAndCategory.product.getUpdatedAt(),
        name: productAndCategory.product.getName(),
        price: productAndCategory.product.getPrice(),
        description: productAndCategory.product.getDescription(),
        pictures: productAndCategory.product.getPictures(),
        category: {
          id: productAndCategory.category.getId(),
          createdAt: productAndCategory.category.getCreatedAt(),
          updatedAt: productAndCategory.category.getUpdatedAt(),
          type: productAndCategory.category.getType(),
        },
      };
    });

    return JSON.stringify(mappedProducts);
  },

  adaptJson: (productAndCategory: ProductAndCategory | null): string => {
    if (productAndCategory === null) {
      return JSON.stringify({});
    }

    const mappedProduct = {
      id: productAndCategory.product.getId(),
      createdAt: productAndCategory.product.getCreatedAt(),
      updatedAt: productAndCategory.product.getUpdatedAt(),
      name: productAndCategory.product.getName(),
      price: productAndCategory.product.getPrice(),
      description: productAndCategory.product.getDescription(),
      pictures: productAndCategory.product.getPictures(),
      category: {
        id: productAndCategory.category.getId(),
        createdAt: productAndCategory.category.getCreatedAt(),
        updatedAt: productAndCategory.category.getUpdatedAt(),
        type: productAndCategory.category.getType(),
      },
    };

    return JSON.stringify(mappedProduct);
  },
};
