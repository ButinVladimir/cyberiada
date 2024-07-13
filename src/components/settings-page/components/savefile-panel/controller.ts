import { ReactiveController, ReactiveControllerHost } from 'lit';
import { AppState } from '@state/app-state';

export class SavefilePanelController implements ReactiveController {
  private _host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  hostConnected() {}

  hostDisconnected() {}

  importSavefile(file: File) {
    AppState.instance.importSavefile(file);
  }

  exportSavefile() {
    AppState.instance.exportSavefile();
  }

  deleteSaveData() {
    AppState.instance.deleteSaveData();
  }
}
