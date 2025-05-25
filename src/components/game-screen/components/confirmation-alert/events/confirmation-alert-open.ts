import { GameAlert } from '@shared/types';

export class ConfirmationAlertOpenEvent extends Event {
  static readonly type = 'confirmation-alert-open';

  readonly gameAlert: GameAlert;
  readonly message: string;
  readonly gameAlertKey?: string;

  constructor(gameAlert: GameAlert, message: string, gameAlertKey?: string) {
    super(ConfirmationAlertOpenEvent.type, {
      bubbles: true,
      composed: true,
    });

    this.gameAlert = gameAlert;
    this.message = message;
    this.gameAlertKey = gameAlertKey;
  }
}
