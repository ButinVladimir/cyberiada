export class PurchaseProgramDialogClose extends Event {
  static readonly type = 'purchase-program-dialog-close';

  constructor() {
    super(PurchaseProgramDialogClose.type, {
      bubbles: true,
      composed: true,
    });
  }
}
