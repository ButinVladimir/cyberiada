export class ConfirmationAlertCloseEvent extends Event {
  static readonly type = 'confirmation-alert-close';

  constructor() {
    super(ConfirmationAlertCloseEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
