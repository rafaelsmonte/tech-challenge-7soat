export class OrderProductNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderProductNotFoundError';
  }
}
