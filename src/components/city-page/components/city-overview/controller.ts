import { ReactiveController, ReactiveControllerHost } from 'lit';
import { AppState } from '@state/app-state';
import { IDistrictInfo } from '@state/city-state/interfaces/district-info';

export class CityOverviewController implements ReactiveController {
  private _host: ReactiveControllerHost;
  private _map: number[][];

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
    this._map = AppState.instance.cityState.getMapCopy();
  }

  hostConnected() {}

  hostDisconnected() {}

  get map(): number[][] {
    return this._map;
  }

  get mapCellSize(): number {
    return AppState.instance.settingsState.mapCellSize;
  }

  getDistrictInfo(district: number): IDistrictInfo {
    return AppState.instance.cityState.getDistrictInfo(district);
  }

  setMapCellSize(mapCellSize: number) {
    AppState.instance.settingsState.setMapCellSize(mapCellSize);
  }
}
