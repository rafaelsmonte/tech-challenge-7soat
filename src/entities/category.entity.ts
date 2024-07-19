export class Category {
  public readonly id: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly type: string;

  constructor(id: number, createdAt: Date, updatedAt: Date, type: string) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.type = type;
  }
}
