import { injectable } from 'inversify';
import { BaseAvailableCategoryItemsState } from './base-available-category-items-state';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';

@injectable()
export class AvailableProgramsState extends BaseAvailableCategoryItemsState<ProgramName> {
  protected recalculateNeutralItemsList(): void {
    this._neutralItems.clear();

    this._globalState.faction.neutralFactionValues.programs.forEach((programName) => {
      this._neutralItems.add(programName);
    });
  }
}
