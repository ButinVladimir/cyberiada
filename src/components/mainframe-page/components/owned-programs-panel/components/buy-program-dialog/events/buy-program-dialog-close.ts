export class BuyProgramDialogClose extends Event {
  static readonly type = 'buy-program-dialog-close';

  constructor() {
    super(BuyProgramDialogClose.type, {
      bubbles: true,
      composed: true,
    });
  }
}
