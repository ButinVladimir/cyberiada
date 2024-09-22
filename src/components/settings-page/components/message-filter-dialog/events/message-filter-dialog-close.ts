export class MessageFilterDialogCloseEvent extends Event {
  static readonly type = 'message-filter-dialog-close';

  constructor() {
    super(MessageFilterDialogCloseEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
