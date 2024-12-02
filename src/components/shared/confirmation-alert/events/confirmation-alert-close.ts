import { GameAlert } from '@shared/types';

export class ConfirmationAlertCloseEvent extends Event {
  static readonly type = 'confirmation-alert-close';

  readonly gameAlert: GameAlert;
  readonly gameAlertKey?: string;

  constructor(gameAlert: GameAlert, gameAlertKey?: string) {
    super(ConfirmationAlertCloseEvent.type, {
      bubbles: true,
      composed: true,
    });

    this.gameAlert = gameAlert;
    this.gameAlertKey = gameAlertKey;
  }
}
