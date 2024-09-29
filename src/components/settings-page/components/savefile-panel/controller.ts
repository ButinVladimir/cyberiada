import { BaseController } from '@shared/base-controller';

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
}
