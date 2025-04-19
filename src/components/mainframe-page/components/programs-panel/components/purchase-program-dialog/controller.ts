import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';

export class PurchaseProgramDialogController extends BaseController {
  get developmentLevel(): number {
    return this.globalState.development.level;
  }

  getOwnedProgram(programName: ProgramName): IProgram | undefined {
    return this.mainframeState.programs.getOwnedProgramByName(programName);
  }

  getHighestAvailableQuality(programName: ProgramName): number {
    try {
      return this.globalState.availableItems.programs.getItemHighestAvailableQuality(programName);
    } catch (e) {
      console.error(e);
    }

    return 0;
  }

  listAvailablePrograms(): ProgramName[] {
    return this.globalState.availableItems.programs.listAvailableItems() as ProgramName[];
  }

  purchaseProgram(name: ProgramName, quality: number, level: number): boolean {
    return this.mainframeState.programs.purchaseProgram(name, quality, level);
  }
}
