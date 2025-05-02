import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';

export interface IAvailableCategoryActivities<Key = string> extends IUIEventEmitter {
  listAvailableActivities(): Key[];
  isActivityAvailable(activityName: Key): boolean;
  recalculate(): void;
}
