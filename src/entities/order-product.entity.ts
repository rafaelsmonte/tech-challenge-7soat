import { InvalidOrderProductError } from 'src/errors/invalid-order-product.error';

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

    this.validate();
  }

  // TODO improve validations

  static new(
    orderId: number,
    productId: number,
    quantity: number,
  ): OrderProduct {
    const now = new Date();
    return new OrderProduct(0, now, now, orderId, productId, quantity);
  }

  validate() {
    if (this.quantity <= 0) {
      throw new InvalidOrderProductError('Quantity must be greater than 0');
    }

    if (this.quantity > 10) {
      throw new InvalidOrderProductError('Quantity must be lesser than 10');
    }
  }
}
