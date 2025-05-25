import { injectable } from 'inversify';
import programs from '@configs/programs.json';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { Feature } from '@shared/types';
import { BaseAvailableCategoryItemsState } from './base-available-category-items-state';

@injectable()
export class AvailableProgramsState extends BaseAvailableCategoryItemsState<ProgramName> {
  protected recalculateNeutralItemsList(): void {
    this._neutralItems.clear();

    this._globalState.faction.neutralFactionValues.programs.forEach((programName) => {
      this._neutralItems.add(programName);
    });
  }

  protected getItemRequiredFeatures(itemName: ProgramName): Feature[] {
    return programs[itemName].requiredFeatures as Feature[];
  }
}
