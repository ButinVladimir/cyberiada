import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';

export class PurchaseProgramDialogBuyButtonController extends BaseController {
  private _selectedProgram?: IProgram;

  hostDisconnected() {
    super.hostDisconnected();

    this.deleteSelectedProgram();
  }

  get money(): number {
    return this.globalState.money.money;
  }

  getSelectedProgram(name: ProgramName, quality: number, level: number): IProgram {
    if (
      this._selectedProgram?.name !== name ||
      this._selectedProgram.quality !== quality ||
      this._selectedProgram.level !== level
    ) {
      this.deleteSelectedProgram();

      this._selectedProgram = this.programFactory.makeProgram({
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

  private deleteSelectedProgram() {
    if (this._selectedProgram) {
      this.removeEventListenersByEmitter(this._selectedProgram);
      this._selectedProgram.removeEventListeners();
    }
  }
}
