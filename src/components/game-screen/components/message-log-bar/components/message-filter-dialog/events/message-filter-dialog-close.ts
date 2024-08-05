export class MessageFilterDialogClose extends Event {
  static readonly type = 'message-filter-dialog-close';

  constructor() {
    super(MessageFilterDialogClose.type, {
      bubbles: true,
      composed: true,
    });
  }
}
