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

  get developmentLevel(): number {
    return this.globalState.development.level;
  }

  getSelectedProgram(name: ProgramName, level: number, quality: number): IProgram {
    if (
      this._selectedProgram?.name !== name ||
      this._selectedProgram.level !== level ||
      this._selectedProgram.quality !== quality
    ) {
      this.deleteSelectedProgram();

      this._selectedProgram = this.programFactory.makeProgram({
        name,
        level,
        quality,
        autoUpgradeEnabled: true,
      });
    }

    return this._selectedProgram;
  }

  private deleteSelectedProgram() {
    if (this._selectedProgram) {
      this.removeEventListenersByEmitter(this._selectedProgram);
      this._selectedProgram.removeEventListeners();
    }
  }
}
