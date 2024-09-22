export class ConfirmationAlertSubmitEvent extends Event {
  static readonly type = 'confirmation-alert-submit';

  constructor() {
    super(ConfirmationAlertSubmitEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
