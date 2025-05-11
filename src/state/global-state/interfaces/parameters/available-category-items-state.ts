import { ISerializeable } from '@shared/interfaces/serializable';
import { IAvailableCategoryItemsSerializedState } from '../serialized-states/available-category-items-serialized-state';

export interface IAvailableCategoryItemsState<Key = string>
  extends ISerializeable<IAvailableCategoryItemsSerializedState<Key>> {
  loanedQuality: number;
  listAvailableItems(): Key[];
  isItemAvailable(itemName: Key, quality: number, level: number): boolean;
  getItemHighestAvailableQuality(itemName: Key): number;
  recalculate(): void;
}
