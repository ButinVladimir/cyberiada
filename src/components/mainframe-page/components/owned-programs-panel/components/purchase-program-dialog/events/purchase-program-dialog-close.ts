export class PurchaseProgramDialogCloseEvent extends Event {
  static readonly type = 'purchase-program-dialog-close';

  constructor() {
    super(PurchaseProgramDialogCloseEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
