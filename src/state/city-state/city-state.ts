import { injectable, inject } from 'inversify';
import scenarios from '@configs/scenarios.json';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMapGeneratorResult } from '@workers/map-generator/interfaces';
import { IEventBatcher } from '@shared/interfaces/event-batcher';
import { EventBatcher } from '@shared/event-batcher';
import { TYPES } from '@state/types';
import { ICityState, ICitySerializedState, IDistrictState, IDistrictSerializedState } from './interfaces';
import { DistrictState } from './district-state';
import { DistrictUnlockState } from './types';

@injectable()
export class CityState implements ICityState {
  readonly uiEventBatcher: IEventBatcher;

  private _globalState: IGlobalState;
  private _stateUiConnector: IStateUIConnector;

  private _layout: number[][];
  private _districts: Map<number, IDistrictState>;

  constructor(
    @inject(TYPES.GlobalState) _globalState: IGlobalState,
    @inject(TYPES.StateUIConnector) _stateUiConnector: IStateUIConnector,
  ) {
    this._globalState = _globalState;
    this._stateUiConnector = _stateUiConnector;

    this._layout = [];
    this._districts = new Map();

    this.uiEventBatcher = new EventBatcher();
  }

  getLayout(): number[][] {
    return this._layout;
  }

  getDistrictState(districtIndex: number): IDistrictState {
    if (!this._districts.has(districtIndex)) {
      throw new Error(`Missing district ${districtIndex}`);
    }

    return this._districts.get(districtIndex)!;
  }

  recalculate() {
    for (const district of this._districts.values()) {
      district.recalculate();
    }
  }

  async startNewState(): Promise<void> {
    await this.generateMap();
    this.recalculate();
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
      const districtState = DistrictState.deserialize(districtSerializedInfo);

      this._districts.set(districtNumParsed, districtState);
    });
  }

  serialize(): ICitySerializedState {
    const layout: number[][] = this.getLayout();

    const districts: Record<number, IDistrictSerializedState> = {};
    this._districts.forEach((districtState, districtNum) => {
      districts[districtNum] = districtState.serialize();
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
          const districtState = DistrictState.createByMapGenerator(district);

          districtState.state =
            parsedDistrictNum === scenarios[this._globalState.scenario.scenario].map.startingDistrict
              ? DistrictUnlockState.contested
              : DistrictUnlockState.locked;

          this._districts.set(parsedDistrictNum, districtState);
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
