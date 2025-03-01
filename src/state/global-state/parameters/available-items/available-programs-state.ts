import { injectable } from 'inversify';
import { BaseAvailableCategoryItemsState } from './base-available-category-items-state';

@injectable()
export class AvailableProgramsState extends BaseAvailableCategoryItemsState {
  protected recalculateNeutralItemsList(): void {
    this._neutralItems.clear();

    this._globalState.faction.neutralFactionValues.programs.forEach((programName) => {
      this._neutralItems.add(programName);
    });
  }
}
