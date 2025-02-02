import { GameAlert } from '@shared/types';

export class ConfirmationAlertSubmitEvent extends Event {
  static readonly type = 'confirmation-alert-submit';

  readonly gameAlert: GameAlert;
  readonly gameAlertKey?: string;

  constructor(gameAlert: GameAlert, gameAlertKey?: string) {
    super(ConfirmationAlertSubmitEvent.type, {
      bubbles: true,
      composed: true,
    });

    this.gameAlert = gameAlert;
    this.gameAlertKey = gameAlertKey;
  }
}
