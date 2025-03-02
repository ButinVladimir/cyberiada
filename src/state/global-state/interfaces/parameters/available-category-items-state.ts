import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { IAvailableCategoryItemsSerializedState } from '../serialized-states/available-category-items-serialized-state';

export interface IAvailableCategoryItemsState
  extends ISerializeable<IAvailableCategoryItemsSerializedState>,
    IUIEventEmitter {
  loanedQuality: number;
  listAvailableItems(): string[];
  isItemAvailable(itemName: string, quality: number, level: number): boolean;
  getItemHighestAvailableQuality(itemName: string): number;
}
