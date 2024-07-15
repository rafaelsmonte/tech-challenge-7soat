export class Order {
  private _id: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _notes: string;
  private _trackingId: number;
  private _totalPrice: number;
  private _status: string;
  private _customerId: number;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    notes: string,
    trackingId: number,
    totalPrice: number,
    status: string,
    customerId: number,
  ) {
    this._id = id;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._notes = notes;
    this._trackingId = trackingId;
    this._totalPrice = totalPrice;
    this._status = status;
    this._customerId = customerId;
  }
}
