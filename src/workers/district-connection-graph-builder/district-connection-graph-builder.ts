import scenarios from '@configs/scenarios.json';
import { Scenario } from '@shared/types';
import {
  IDistrictConnectionGraphBuilder,
  IDistrictConnectionGraphBuilderArgs,
  IDistrictConnectionGraphBuilderResult,
} from './interfaces';

export class DistrictConnectionGraphBuilder implements IDistrictConnectionGraphBuilder {
  private _layout: number[][];
  private _scenario: Scenario;
  private _connections: Map<number, Set<number>>;
  private _districtSizes: Map<number, number>;

  constructor(args: IDistrictConnectionGraphBuilderArgs) {
    this._layout = args.layout;
    this._scenario = args.scenario;
    this._connections = new Map<number, Set<number>>();
    this._districtSizes = new Map<number, number>();
  }

  private get _width() {
    return scenarios[this._scenario].map.width;
  }

  private get _height() {
    return scenarios[this._scenario].map.height;
  }

  build(): IDistrictConnectionGraphBuilderResult {
    this.buildConnections();
    this.calculateDistrictSizes();

    return {
      connections: this._connections,
      districtSizes: this._districtSizes,
    };
  }

  private buildConnections() {
    const districtsNum = scenarios[this._scenario].map.districts.length;

    for (let i = 0; i < districtsNum; i++) {
      this._connections.set(i, new Set<number>());
    }

    for (let x = 0; x < this._width; x++) {
      for (let y = 0; y < this._height; y++) {
        this.connectPosition(x, y);
      }
    }
  }

  private connectPosition(x: number, y: number) {
    const districtFrom = this._layout[x][y];

    if (x < this._width - 1) {
      const districtTo = this._layout[x + 1][y];

      this.connectDistricts(districtFrom, districtTo);
    }

    if (y < this._height - 1) {
      const districtTo = this._layout[x][y + 1];

      this.connectDistricts(districtFrom, districtTo);
    }
  }

  private connectDistricts(districtFrom: number, districtTo: number) {
    if (districtFrom !== districtTo) {
      this._connections.get(districtFrom)!.add(districtTo);
      this._connections.get(districtTo)!.add(districtFrom);
    }
  }

  private calculateDistrictSizes() {
    const districtsNum = scenarios[this._scenario].map.districts.length;

    for (let i = 0; i < districtsNum; i++) {
      this._districtSizes.set(i, 0);
    }

    let district: number;

    for (let x = 0; x < this._width; x++) {
      for (let y = 0; y < this._height; y++) {
        district = this._layout[x][y];
        this._districtSizes.set(district, this._districtSizes.get(district)! + 1);
      }
    }
  }
}
