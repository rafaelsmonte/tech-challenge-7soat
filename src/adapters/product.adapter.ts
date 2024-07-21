import { CategoryNotFoundError } from 'src/errors/category-not-found.error';
import { DatabaseError } from 'src/errors/database.error';
import { InvalidProductError } from 'src/errors/invalid-product.error';
import { ProductAndCategory } from 'src/types/product-and-category.type';

export const ProductAdapter = {
  adaptArrayJson: (productsAndCategory: ProductAndCategory[]): string => {
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

  adaptError(error: Error): { code: number; message: string } {
    if (error instanceof InvalidProductError) {
      return { code: 400, message: error.message };
    } else if (error instanceof CategoryNotFoundError) {
      return { code: 404, message: error.message };
    } else if (error instanceof DatabaseError) {
      return { code: 500, message: error.message };
    } else {
      return { code: 500, message: 'Internal server error' };
    }
  },
};
