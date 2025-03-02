import { ReactiveControllerHost } from 'lit';
import { BaseController } from '@shared/base-controller';

export class CityMapController extends BaseController {
  private _map: number[][];

  constructor(host: ReactiveControllerHost) {
    super(host);
    this._map = this.cityState.getMap();
  }

  get map(): number[][] {
    return this._map;
  }

  get mapWidth(): number {
    return this.globalState.scenario.currentValues.mapWidth;
  }

  get mapHeight(): number {
    return this.globalState.scenario.currentValues.mapHeight;
  }
}
