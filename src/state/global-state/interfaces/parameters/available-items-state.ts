import { ISerializeable } from '@shared/interfaces/serializable';
import { IAvailableItemsSerializedState } from '../serialized-states/available-items-serialized-state';
import { IAvailableProgramsState } from './available-items';

export interface IAvailableItemsState extends ISerializeable<IAvailableItemsSerializedState> {
  programs: IAvailableProgramsState;
}
