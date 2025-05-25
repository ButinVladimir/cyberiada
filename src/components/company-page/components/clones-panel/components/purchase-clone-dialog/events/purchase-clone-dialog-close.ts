export class PurchaseCloneDialogCloseEvent extends Event {
  static readonly type = 'purchase-clone-dialog-close';

  constructor() {
    super(PurchaseCloneDialogCloseEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
