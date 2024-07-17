export class Customer {
  private _id: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _name: string;
  private _taxpayerRegistry: string;
  private _email: string;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    taxpayerRegistry: string,
    email: string,
  ) {
    this._id = id;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._name = name;
    this._taxpayerRegistry = taxpayerRegistry;
    this._email = email;
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

  public get name(): string {
    return this._name;
  }

  public get taxpayerRegistry(): string {
    return this._taxpayerRegistry;
  }

  public get email(): string {
    return this._email;
  }
}
