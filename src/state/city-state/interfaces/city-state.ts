import { ISerializeable } from '@shared/interfaces/serializable';
import { ICitySerializedState } from './serialized-states/city-serialized-state';
import { IDistrictState } from './district-state';

export interface ICityState extends ISerializeable<ICitySerializedState> {
  districtsCount: number;
  getLayout(): number[][];
  getDistrictState(districtIndex: number): IDistrictState;
  listAvailableDistricts(): IDistrictState[];
  recalculate(): void;
}
