import { OrderStatus } from 'src/enum/order-status.enum';
import { InvalidOrderError } from 'src/errors/invalid-order.error';

export class Order {
  public readonly id: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly notes: string;
  public readonly trackingId: number;
  public readonly totalPrice: number;
  public readonly status: OrderStatus;
  public readonly customerId?: number;
  public readonly paymentId: string;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    notes: string,
    trackingId: number,
    totalPrice: number,
    status: string,
    customerId?: number,
    paymentId?: string,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.notes = notes;
    this.trackingId = trackingId;
    this.totalPrice = totalPrice;
    this.status = OrderStatus[status];
    this.customerId = customerId;
    this.paymentId = paymentId;

    this.validate();
  }

  static new(
    notes: string,
    trackingId: number,
    totalPrice: number,
    status: string,
    customerId?: number,
    paymentId?: string,

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
      paymentId,
    );
  }

  // TODO improve validations

  validate() {
    if (this.notes.length > 50) {
      throw new InvalidOrderError('Notes size must be lesser than 50');
    }

    if (!this.status) {
      throw new InvalidOrderError(
        'Status must be AWAITING, IN_PROGRESS, DONE or CANCELLED',
      );
    }
  }
 
}
