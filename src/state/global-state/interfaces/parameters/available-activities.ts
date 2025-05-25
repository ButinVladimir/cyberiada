import { IAvailableCategoryActivities } from './available-category-activities';
import { SidejobName } from '@/state/company-state';

export interface IAvailableActivities {
  sidejobs: IAvailableCategoryActivities<SidejobName>;
  requestRecalculation(): void;
  recalculate(): void;
}
