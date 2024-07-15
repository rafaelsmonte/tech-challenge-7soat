export class Product {
  private _id: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _name: string;
  private _price: number;
  private _description: string;
  private _pictures: string[];
  private _categoryId: number;

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
    this._id = id;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._name = name;
    this._price = price;
    this._description = description;
    this._pictures = pictures;
    this._categoryId = categoryId;
  }
}
