import { BaseController } from '@shared/base-controller';

export class SavefilePanelController extends BaseController {
  importSavefile(file: File) {
    this.appState.importSavefile(file);
  }

  exportSavefile() {
    this.appState.exportSavefile();
  }

  deleteSaveData() {
    this.appState.deleteSaveData();
  }
}
