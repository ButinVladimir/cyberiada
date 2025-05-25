export class BuyMaxHardwareEvent extends Event {
  static readonly type = 'buy-max-hardware';

  constructor() {
    super(BuyMaxHardwareEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
