import { injectable, inject } from 'inversify';
import type { IGeneralState } from '@state/general-state/interfaces';
import { Scenario } from '@shared/types';
import constants from '@configs/constants.json';
import { ICityState, ICitySerializedState, IDistrictInfo, IDistrictSerializedInfo } from './interfaces';
import { DistrictInfo } from './district-info';
import { IMapGeneratorResult } from '@workers/map-generator/interfaces';
import { TYPES } from '@state/types';

@injectable()
export class CityState implements ICityState {
  private _generalState: IGeneralState;
  private _map: number[][];
  private _districts: Map<number, IDistrictInfo>;
  private _scenario: Scenario;

  constructor(@inject(TYPES.GeneralState) _generalState: IGeneralState) {
    this._generalState = _generalState;
    this._map = [];
    this._districts = new Map();
    this._scenario = Scenario.tutorial1;
  }

  get scenario(): Scenario {
    return this._scenario;
  }

  getMapCopy(): number[][] {
    const map: number[][] = [];

    for (let x = 0; x < constants.mapWidth; x++) {
      map[x] = [];

      for (let y = 0; y < constants.mapHeight; y++) {
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

  async startNewState(): Promise<void> {
    await this.generateMap();
  }

  deserialize(serializedState: ICitySerializedState): void {
    this._scenario = serializedState.scenario;

    this._map = [];
    for (let x = 0; x < constants.mapWidth; x++) {
      const row: number[] = [];

      for (let y = 0; y < constants.mapHeight; y++) {
        row.push(serializedState.map[x][y]);
      }

      this._map.push(row);
    }

    this._districts.clear();

    Object.entries(serializedState.districts).forEach(([districtNum, districtSerializedInfo]) => {
      const districtNumParsed = parseInt(districtNum);
      const districtInfo = DistrictInfo.deserialize(districtSerializedInfo);

      this._districts.set(districtNumParsed, districtInfo);
    });
  }

  serialize(): ICitySerializedState {
    const map: number[][] = this.getMapCopy();

    const districts: Record<number, IDistrictSerializedInfo> = {};
    this._districts.forEach((districtInfo, districtNum) => {
      districts[districtNum] = districtInfo.serialize();
    });

    return {
      scenario: this._scenario,
      map,
      districts,
    };
  }

  private generateMap(): Promise<void> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('@workers/map-generator/index.js', import.meta.url), { type: 'module' });

      worker.addEventListener('message', (event: MessageEvent<IMapGeneratorResult>) => {
        this._map = event.data.map;
        this._districts.clear();
        for (const [districtNum, district] of Object.entries(event.data.districts)) {
          const parsedDistrictNum = parseInt(districtNum);
          const districtInfo = DistrictInfo.deserializeMapGeneratorResult(district);

          this._districts.set(parsedDistrictNum, districtInfo);
        }

        resolve();
      });

      worker.addEventListener('error', (event: ErrorEvent) => {
        reject(event.error);
      });

      worker.addEventListener('messageerror', () => {
        reject('Unable to parse map generator message');
      });

      worker.postMessage({
        scenario: this._scenario,
        randomSeed: this._generalState.randomSeed,
      });
    });
  }
}
