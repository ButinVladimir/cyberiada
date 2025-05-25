import { BaseController } from '@shared/base-controller';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';

export class OverviewUnlockedProgramsController extends BaseController {
  listItems() {
    return this.globalState.availableItems.programs.listAvailableItems();
  }

  getItemHighestAvailableTier(itemName: ProgramName) {
    return this.globalState.availableItems.programs.getItemHighestAvailableTier(itemName);
  }
}
