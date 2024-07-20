import { OrderStatus } from 'src/enum/order-status.enum';

export class Order {
  public readonly id: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly notes: string;
  public readonly trackingId: number;
  public readonly totalPrice: number;
  public readonly status: string;
  public readonly customerId?: number;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    notes: string,
    trackingId: number,
    totalPrice: number,
    status: string,
    customerId?: number,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.notes = notes;
    this.trackingId = trackingId;
    this.totalPrice = totalPrice;
    this.status = status;
    this.customerId = customerId;
  }

  // TODO validate fields

  static new(
    notes: string,
    trackingId: number,
    totalPrice: number,
    status: OrderStatus,
    customerId?: number,
  ): Order {
    const now = new Date();
    return new Order(
      0,
      now,
      now,
      notes,
      trackingId,
      totalPrice,
      status,
      customerId,
    );
  }
}
