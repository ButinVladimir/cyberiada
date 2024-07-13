import { Scenario } from '@shared/constants';
import { ICitySerializedState } from './city-serialized-state';
import { IDistrictInfo } from './district-info';

export interface ICityState {
  scenario: Scenario;
  getMapCopy(): number[][];
  getDistrictInfo(num: number): IDistrictInfo;
  startNewState(): Promise<void>;
  deserialize(serializedState: ICitySerializedState): void;
  serialize(): ICitySerializedState;
}
