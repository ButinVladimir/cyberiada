import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';

export class PurchaseProgramDialogController extends BaseController {
  private _selectedProgram?: IProgram;

  hostDisconnected() {
    super.hostDisconnected();

    this.deleteSelectedProgram();
  }

  get money(): number {
    return this.globalState.money.money;
  }

  get cityLevel(): number {
    return this.globalState.cityDevelopment.level;
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

  getOwnedProgram(name: ProgramName): IProgram | undefined {
    return this.mainframeProgramsState.getOwnedProgramByName(name);
  }

  purchaseProgram(name: ProgramName, level: number, quality: number): boolean {
    return this.mainframeProgramsState.purchaseProgram({
      name,
      level,
      quality,
      autoUpgradeEnabled: true,
    });
  }

  private deleteSelectedProgram() {
    if (this._selectedProgram) {
      this.removeEventListenersByEmitter(this._selectedProgram);
      this.programFactory.deleteProgram(this._selectedProgram);
    }
  }
}
