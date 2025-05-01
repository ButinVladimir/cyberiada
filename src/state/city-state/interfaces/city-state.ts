import { ISerializeable } from '@shared/interfaces/serializable';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ICitySerializedState } from './serialized-states/city-serialized-state';
import { IDistrictState } from './district-state';

export interface ICityState extends ISerializeable<ICitySerializedState>, IUIEventEmitter {
  districtsCount: number;
  getLayout(): number[][];
  getDistrictState(districtIndex: number): IDistrictState;
  recalculate(): void;
}
