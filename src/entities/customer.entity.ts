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
}
