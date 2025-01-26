import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';

export class ProgramDiffTextController extends BaseController {
  private _selectedProgram?: IProgram;

  get ram(): number {
    return this.mainframeHardwareState.ram.level;
  }

  get cores(): number {
    return this.mainframeHardwareState.cores.level;
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

  private deleteSelectedProgram() {
    if (this._selectedProgram) {
      this.removeEventListenersByEmitter(this._selectedProgram);
      this._selectedProgram.removeEventListeners();
    }
  }
}
