import { InvalidProductError } from 'src/errors/invalid-product.error';

export class Product {
  public readonly id: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly name: string;
  public readonly price: number;
  public readonly description: string;
  public readonly pictures: string[];
  public readonly categoryId: number;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    price: number,
    description: string,
    pictures: string[],
    categoryId: number,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.price = price;
    this.description = description;
    this.pictures = pictures;
    this.categoryId = categoryId;

    this.validate();
  }

  static new(
    name: string,
    price: number,
    description: string,
    pictures: string[],
    categoryId: number,
  ): Product {
    const now = new Date();
    return new Product(
      0,
      now,
      now,
      name,
      price,
      description,
      pictures,
      categoryId,
    );
  }

  // TODO improve validations

  validate() {
    if (this.price <= 0) {
      throw new InvalidProductError('Price must be greater than 0');
    }

    if (this.name.length > 50) {
      throw new InvalidProductError('Name size must be lesser than 50');
    }

    if (this.description.length > 50) {
      throw new InvalidProductError('Description size must be lesser than 50');
    }
  }
}
