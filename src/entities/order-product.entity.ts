import { InvalidOrderProductError } from 'src/errors/invalid-order-product.error';

export class OrderProduct {
  private id: number;
  private createdAt: Date;
  private updatedAt: Date;
  private orderId: number;
  private productId: number;
  private quantity: number;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    orderId: number,
    productId: number,
    quantity: number,
  ) {
    this.setId(id);
    this.setCreatedAt(createdAt);
    this.setUpdatedAt(updatedAt);
    this.setOrderId(orderId);
    this.setProductId(productId);
    this.setQuantity(quantity);
  }

  static new(
    orderId: number,
    productId: number,
    quantity: number,
  ): OrderProduct {
    const now = new Date();
    return new OrderProduct(0, now, now, orderId, productId, quantity);
  }

  // getters
  public getId(): number {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getOrderId(): number {
    return this.orderId;
  }

  public getProductId(): number {
    return this.productId;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  // setters
  public setId(id: number): void {
    this.id = id;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  public setOrderId(orderId: number): void {
    this.orderId = orderId;
  }

  public setProductId(productId: number): void {
    this.productId = productId;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;

    if (this.quantity <= 0) {
      throw new InvalidOrderProductError('Quantity must be greater than 0');
    }

    if (this.quantity > 10) {
      throw new InvalidOrderProductError('Quantity must be lesser than 10');
    }
  }
}
