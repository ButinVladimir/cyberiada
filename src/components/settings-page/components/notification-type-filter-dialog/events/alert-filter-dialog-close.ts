export class NotificationTypeFilterDialogCloseEvent extends Event {
  static readonly type = 'notification-type-filter-dialog-close';

  constructor() {
    super(NotificationTypeFilterDialogCloseEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
