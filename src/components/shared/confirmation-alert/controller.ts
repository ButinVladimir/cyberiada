import { BaseController } from '@shared/base-controller';
import { GameAlert } from '@shared/types';

export class ConfirmationAlertController extends BaseController {
  isGameAlertEnabled(gameAlert: GameAlert): boolean {
    return this.settingsState.isGameAlertEnabled(gameAlert);
  }

  toggleGameAlert(gameAlert: GameAlert, enabled: boolean) {
    this.settingsState.toggleGameAlert(gameAlert, enabled);
  }
}
