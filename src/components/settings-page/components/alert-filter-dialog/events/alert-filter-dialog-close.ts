export class AlertFilterDialogCloseEvent extends Event {
  static readonly type = 'alert-filter-dialog-close';

  constructor() {
    super(AlertFilterDialogCloseEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
