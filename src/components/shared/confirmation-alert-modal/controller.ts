import { BaseController } from '@shared/base-controller';
import { GameAlert } from '@shared/types';

export class ConfirmationAlertModalController extends BaseController {
  toggleGameAlert(gameAlert: GameAlert, enabled: boolean) {
    this.settingsState.toggleGameAlert(gameAlert, enabled);
  }
}
