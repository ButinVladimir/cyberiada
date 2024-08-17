export class BuyHardwareUpgradeEvent extends Event {
  static readonly type = 'buy-hardware-upgrade';

  constructor() {
    super(BuyHardwareUpgradeEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
