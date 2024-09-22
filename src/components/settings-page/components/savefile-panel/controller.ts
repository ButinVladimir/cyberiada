import { BaseController } from '@shared/base-controller';
import { GameAlert } from '@shared/types';

export class SavefilePanelController extends BaseController {
  saveGame() {
    this.app.saveGame();
  }

  importSavefile(file: File) {
    this.app.importSavefile(file);
  }

  exportSavefile() {
    this.app.exportSavefile();
  }

  async deleteSaveData() {
    await this.app.deleteSaveData();
  }

  isGameAlertEnabled(gameAlert: GameAlert): boolean {
    return this.settingsState.isGameAlertEnabled(gameAlert);
  }

  toggleGameAlert(gameAlert: GameAlert, enabled: boolean) {
    this.settingsState.toggleGameAlert(gameAlert, enabled);
  }
}
