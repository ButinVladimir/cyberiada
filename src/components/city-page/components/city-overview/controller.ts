import { ReactiveController, ReactiveControllerHost } from 'lit';
import { AppState } from '@state/app-state';
import { IDistrictInfo } from '@state/city-state/interfaces/district-info';

export class CityOverviewController implements ReactiveController {
  private _host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  hostConnected() {}

  hostDisconnected() {}

  get mapCellSize(): number {
    return AppState.instance.settingsState.mapCellSize;
  }

  getDistrictInfo(district: number): IDistrictInfo {
    return AppState.instance.cityState.getDistrictInfo(district);
  }

  setMapCellSize(mapCellSize: number) {
    AppState.instance.settingsState.setMapCellSize(mapCellSize);
  }

  saveGame() {
    AppState.instance.saveGame();
  }
}
