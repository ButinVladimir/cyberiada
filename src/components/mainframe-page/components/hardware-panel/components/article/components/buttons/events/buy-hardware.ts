export class BuyHardwareEvent extends Event {
  static readonly type = 'buy-hardware';

  constructor() {
    super(BuyHardwareEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
