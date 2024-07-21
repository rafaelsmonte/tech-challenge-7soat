import { Category } from 'src/entities/category.entity';

export const CategoryAdapter = {
  adaptArrayJson: (categories: Category[] | null): string => {
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
};
