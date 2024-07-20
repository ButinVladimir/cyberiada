import { ReactiveController, ReactiveControllerHost } from 'lit';
import { AppState } from '@state/app-state';

export class CityMapController implements ReactiveController {
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
}
