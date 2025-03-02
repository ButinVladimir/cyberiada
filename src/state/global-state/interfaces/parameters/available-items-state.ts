import { ISerializeable } from '@shared/interfaces/serializable';
import { IAvailableItemsSerializedState } from '../serialized-states/available-items-serialized-state';
import { IAvailableCategoryItemsState } from './available-category-items-state';

export interface IAvailableItemsState extends ISerializeable<IAvailableItemsSerializedState> {
  programs: IAvailableCategoryItemsState;
}
