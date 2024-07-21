import { Category } from 'src/entities/category.entity';
import { DatabaseError } from 'src/errors/database.error';

export const CategoryAdapter = {
  adaptArrayJson: (categories: Category[]): string => {
    if (categories === null) {
      return JSON.stringify({});
    }

    const mappedCategories = categories.map((category) => {
      return {
        id: category.id,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        type: category.type,
      };
    });

    return JSON.stringify(mappedCategories);
  },

  adaptError(error: Error): { code: number; message: string } {
    if (error instanceof DatabaseError) {
      return { code: 500, message: error.message };
    } else {
      return { code: 500, message: 'Internal server error' };
    }
  },
};
