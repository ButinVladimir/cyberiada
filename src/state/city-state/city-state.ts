import { injectable, inject } from 'inversify';
import scenarios from '@configs/scenarios.json';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import { IMapGeneratorResult } from '@workers/map-generator/interfaces';
import { TYPES } from '@state/types';
import { ICityState, ICitySerializedState, IDistrictInfo, IDistrictSerializedInfo } from './interfaces';
import { DistrictInfo } from './district-info';
import { DistrictState } from './types';

@injectable()
export class CityState implements ICityState {
  private _globalState: IGlobalState;

  private _layout: number[][];
  private _districts: Map<number, IDistrictInfo>;

  constructor(@inject(TYPES.GlobalState) _globalState: IGlobalState) {
    this._globalState = _globalState;

    this._layout = [];
    this._districts = new Map();
  }

  getLayout(): number[][] {
    return this._layout;
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

  async deserialize(serializedState: ICitySerializedState): Promise<void> {
    this._layout = [];
    for (let x = 0; x < this._globalState.scenario.currentValues.map.width; x++) {
      const row: number[] = [];

      for (let y = 0; y < this._globalState.scenario.currentValues.map.height; y++) {
        row.push(serializedState.layout[x][y]);
      }

      this._layout.push(row);
    }

    this._districts.clear();

    Object.entries(serializedState.districts).forEach(([districtNum, districtSerializedInfo]) => {
      const districtNumParsed = parseInt(districtNum);
      const districtInfo = DistrictInfo.deserialize(districtSerializedInfo);

      this._districts.set(districtNumParsed, districtInfo);
    });
  }

  serialize(): ICitySerializedState {
    const layout: number[][] = this.getLayout();

    const districts: Record<number, IDistrictSerializedInfo> = {};
    this._districts.forEach((districtInfo, districtNum) => {
      districts[districtNum] = districtInfo.serialize();
    });

    return {
      layout,
      districts,
    };
  }

  private generateMap(): Promise<void> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('@workers/map-generator/index.js', import.meta.url), { type: 'module' });

      worker.addEventListener('message', (event: MessageEvent<IMapGeneratorResult>) => {
        this._globalState.setRandomShift(event.data.randomShift);

        this._layout = event.data.layout;

        this._districts.clear();
        for (const [districtNum, district] of Object.entries(event.data.districts)) {
          const parsedDistrictNum = parseInt(districtNum);
          const districtInfo = DistrictInfo.createByMapGenerator(district);

          if (parsedDistrictNum === scenarios[this._globalState.scenario.scenario].map.startingDistrict) {
            districtInfo.state = DistrictState.contested;
          }

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
        scenario: this._globalState.scenario.scenario,
        randomSeed: this._globalState.randomSeed,
      });
    });
  }
}
