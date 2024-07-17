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

  public get id(): number {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get type(): string {
    return this._type;
  }
}
