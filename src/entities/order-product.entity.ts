export class OrderProduct {
  public readonly id: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly orderId: number;
  public readonly productId: number;
  public readonly quantity: number;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    orderId: number,
    productId: number,
    quantity: number,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
  }
}
