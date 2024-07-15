export class Category {
  private _id: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _type: string;

  constructor(id: number, createdAt: Date, updatedAt: Date, type: string) {
    this._id = id;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._type = type;
  }
}
