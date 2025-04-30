import { ISerializeable } from '@shared/interfaces/serializable';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ICitySerializedState } from './city-serialized-state';
import { IDistrictState } from './district-state';

export interface ICityState extends ISerializeable<ICitySerializedState>, IUIEventEmitter {
  getLayout(): number[][];
  getDistrictState(districtIndex: number): IDistrictState;
  recalculate(): void;
}
