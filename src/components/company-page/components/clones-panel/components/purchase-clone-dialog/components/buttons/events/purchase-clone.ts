export class PurchaseCloneEvent extends Event {
  static readonly type = 'purchase-clone';

  constructor() {
    super(PurchaseCloneEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
