import { GameAlert } from '@shared/types';

export class ConfirmationAlertOpenEvent extends Event {
  static readonly type = 'confirmation-alert-open';

  readonly gameAlert: GameAlert;
  readonly messageParams: object;
  readonly gameAlertKey?: string;

  constructor(gameAlert: GameAlert, messageParams: object, gameAlertKey?: string) {
    super(ConfirmationAlertOpenEvent.type, {
      bubbles: true,
      composed: true,
    });

    this.gameAlert = gameAlert;
    this.messageParams = messageParams;
    this.gameAlertKey = gameAlertKey;
  }
}
