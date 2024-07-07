import { IAppState } from '@state/app-state/interfaces';
import { MAP_HEIGHT, MAP_WIDTH } from '@shared/constants';
import { ICityState, ICitySerializedState, IDistrictInfo, IDistrictSerializedInfo } from './interfaces';
import { DistrictInfo } from '.';

export class CityState implements ICityState {
  private _appState: IAppState;
  private _map: number[][];
  private _districts: Map<number, IDistrictInfo>;

  constructor(appState: IAppState) {
    this._appState = appState;
    this._map = [];
    this._districts = new Map();
  }

  getMapCopy(): number[][] {
    const map: number[][] = new Array(MAP_WIDTH);
    for (let x = 0; x < MAP_WIDTH; x++) {
      map[x] = new Array(MAP_HEIGHT);

      for (let y = 0; y < MAP_HEIGHT; y++) {
        map[x][y] = this._map[x][y];
      }
    }

    return map;
  }

  getDistrictInfo(num: number): IDistrictInfo {
    if (!this._districts.has(num)) {
      throw new Error(`Missing district ${num}`);
    }

    return this._districts.get(num)!;
  }

  startNewState(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deserialize(serializedState: ICitySerializedState): void {
    for (let x = 0; x < MAP_WIDTH; x++) {
      for (let y = 0; y < MAP_HEIGHT; y++) {
        this._map[x][y] = serializedState.map[x][y];
      }
    }

    this._districts.clear();

    Object
      .entries(serializedState.districts)
      .forEach(([districtNum, districtSerializedInfo]) => {
        const districtNumParsed = parseInt(districtNum);
        const districtInfo = DistrictInfo.deserialize(districtSerializedInfo);

        this._districts.set(
          districtNumParsed,
          districtInfo,
        );
      });
  }

  serialize(): ICitySerializedState {
    const map: number[][] = this.getMapCopy();

    const districts: Record<number, IDistrictSerializedInfo> = {};
    this._districts.forEach((districtInfo, districtNum) => {
      districts[districtNum] = districtInfo.serialize();
    });

    return {
      map,
      districts,
    };
  }
}