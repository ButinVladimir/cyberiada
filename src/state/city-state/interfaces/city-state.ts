import { Scenario } from '@shared/types';
import { ISerializeable } from '@shared/interfaces/serializable';
import { ICitySerializedState } from './city-serialized-state';
import { IDistrictInfo } from './district-info';

export interface ICityState extends ISerializeable<ICitySerializedState> {
  scenario: Scenario;
  getMap(): number[][];
  getDistrictInfo(num: number): IDistrictInfo;
}
