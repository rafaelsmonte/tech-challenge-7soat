import { ProductAndCategory } from 'src/types/product-and-category.interface';

export const ProductAdapter = {
  adaptArrayJson: (
    productsAndCategory: ProductAndCategory[] | null,
  ): string => {
    if (productsAndCategory === null) {
      return JSON.stringify({});
    }

    const mappedProducts = productsAndCategory.map((productAndCategory) => {
      return {
        id: productAndCategory.product.id,
        createdAt: productAndCategory.product.createdAt,
        updatedAt: productAndCategory.product.updatedAt,
        name: productAndCategory.product.name,
        price: productAndCategory.product.price,
        description: productAndCategory.product.description,
        pictures: productAndCategory.product.pictures,
        category: {
          id: productAndCategory.category.id,
          createdAt: productAndCategory.category.createdAt,
          updatedAt: productAndCategory.category.updatedAt,
          type: productAndCategory.category.type,
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
      id: productAndCategory.product.id,
      createdAt: productAndCategory.product.createdAt,
      updatedAt: productAndCategory.product.updatedAt,
      name: productAndCategory.product.name,
      price: productAndCategory.product.price,
      description: productAndCategory.product.description,
      pictures: productAndCategory.product.pictures,
      category: {
        id: productAndCategory.category.id,
        createdAt: productAndCategory.category.createdAt,
        updatedAt: productAndCategory.category.updatedAt,
        type: productAndCategory.category.type,
      },
    };

    return JSON.stringify(mappedProduct);
  },
};
