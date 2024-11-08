import { BaseController } from '@shared/base-controller';
import { GameAlert } from '@shared/types';

export class AlertFilterDialogController extends BaseController {
  isGameAlertEnabled(gameAlert: GameAlert): boolean {
    return this.settingsState.isGameAlertEnabled(gameAlert);
  }

  toggleMessageFilterEvent(gameAlert: GameAlert, enabled: boolean) {
    this.settingsState.toggleGameAlert(gameAlert, enabled);
    this.handleRefreshUI();
  }
}
