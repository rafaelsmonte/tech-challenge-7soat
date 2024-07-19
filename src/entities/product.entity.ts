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
  }
}
