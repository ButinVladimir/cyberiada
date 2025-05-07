export interface IAvailableCategoryActivities<Key = string> {
  listAvailableActivities(): Key[];
  isActivityAvailable(activityName: Key): boolean;
  recalculate(): void;
}
