import { ISerializeable } from '@shared/interfaces/serializable';
import { ICitySerializedState } from './city-serialized-state';
import { IDistrictInfo } from './district-info';

export interface ICityState extends ISerializeable<ICitySerializedState> {
  getMap(): number[][];
  getDistrictInfo(num: number): IDistrictInfo;
}
