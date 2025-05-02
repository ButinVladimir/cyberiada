import { SidejobName } from '@state/company-state';
import { IAvailableActivities, IAvailableCategoryActivities } from '../interfaces';
import { AvailableSidejobs } from './available-activities';

export class AvailableActivities implements IAvailableActivities {
  private _availableSidejobs: IAvailableCategoryActivities<SidejobName>;

  private _recalculationRequested: boolean;

  constructor() {
    this._availableSidejobs = new AvailableSidejobs();

    this._recalculationRequested = true;
  }

  get sidejobs(): IAvailableCategoryActivities<SidejobName> {
    return this._availableSidejobs;
  }

  requestRecalculation() {
    this._recalculationRequested = true;
  }

  recalculate() {
    if (!this._recalculationRequested) {
      return;
    }

    this._recalculationRequested = false;

    this._availableSidejobs.recalculate();
  }
}
