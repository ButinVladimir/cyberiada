import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';

export class PurchaseProgramDialogButtonsController extends BaseController {
  private _selectedProgram?: IProgram;

  hostDisconnected() {
    super.hostDisconnected();

    this.deleteSelectedProgram();
  }

  get money(): number {
    return this.globalState.money.money;
  }

  get moneyGrowth(): number {
    return this.growthState.money.totalGrowth;
  }

  getSelectedProgram(name: ProgramName, quality: number, level: number): IProgram {
    if (
      this._selectedProgram?.name !== name ||
      this._selectedProgram.quality !== quality ||
      this._selectedProgram.level !== level
    ) {
      this.deleteSelectedProgram();

      this._selectedProgram = this.mainframeState.programFactory.makeProgram({
        name,
        quality,
        level,
        autoUpgradeEnabled: true,
      });
    }

    return this._selectedProgram;
  }

  isProgramAvailable(programName: ProgramName, quality: number, level: number): boolean {
    return this.globalState.availableItems.programs.isItemAvailable(programName, quality, level);
  }

  getOwnedProgram(programName: ProgramName): IProgram | undefined {
    return this.mainframeState.programs.getOwnedProgramByName(programName);
  }

  private deleteSelectedProgram() {
    if (this._selectedProgram) {
      this._selectedProgram.removeAllEventListeners();
    }
  }
}
