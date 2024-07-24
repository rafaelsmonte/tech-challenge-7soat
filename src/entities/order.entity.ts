import { OrderStatus } from 'src/enum/order-status.enum';
import { InvalidOrderError } from 'src/errors/invalid-order.error';

export class Order {
  private id: number;
  private createdAt: Date;
  private updatedAt: Date;
  private notes: string;
  private trackingId: number;
  private totalPrice: number;
  private status: OrderStatus;
  private customerId?: number;

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
    this.setId(id);
    this.setCreatedAt(createdAt);
    this.setUpdatedAt(updatedAt);
    this.setNotes(notes);
    this.setTrackingId(trackingId);
    this.setTotalPrice(totalPrice);
    this.setStatus(status);
    this.setCustomerId(customerId);
  }

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

  public getNotes(): string {
    return this.notes;
  }

  public getTrackingId(): number {
    return this.trackingId;
  }

  public getTotalPrice(): number {
    return this.totalPrice;
  }

  public getStatus(): string {
    return this.status;
  }

  public getCustomerId(): number | null {
    return this.customerId;
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

  public setNotes(notes: string): void {
    this.notes = notes;

    if (this.notes.length > 50) {
      throw new InvalidOrderError('Notes size must be lesser than 50');
    }
  }

  public setTrackingId(trackingId: number): void {
    this.trackingId = trackingId;
  }

  public setTotalPrice(totalPrice: number): void {
    this.totalPrice = totalPrice;
  }

  public setStatus(status: string): void {
    this.status = OrderStatus[status];

    if (!this.status) {
      throw new InvalidOrderError(
        'Status must be AWAITING, IN_PROGRESS, DONE or CANCELLED',
      );
    }
  }

  public setCustomerId(customerId: number | null): void {
    this.customerId = customerId;
  }
}
