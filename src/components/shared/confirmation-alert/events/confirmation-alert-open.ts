import { GameAlert } from '@shared/types';

export class ConfirmationAlertOpenEvent extends Event {
  static readonly type = 'confirmation-alert-open';

  readonly gameAlert: GameAlert;
  readonly messageParams: string;
  readonly gameAlertKey?: string;

  constructor(gameAlert: GameAlert, messageParams: string, gameAlertKey?: string) {
    super(ConfirmationAlertOpenEvent.type, {
      bubbles: true,
      composed: true,
    });

    this.gameAlert = gameAlert;
    this.messageParams = messageParams;
    this.gameAlertKey = gameAlertKey;
  }
}
