export class Customer {
  public readonly id: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly name: string;
  public readonly taxpayerRegistry: string;
  public readonly email: string;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    taxpayerRegistry: string,
    email: string,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.taxpayerRegistry = taxpayerRegistry;
    this.email = email;
  }
}
