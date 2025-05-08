import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/mainframe-state/states/progam-factory/interfaces/program';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';

export class ProgramDiffTextController extends BaseController {
  private _selectedProgram?: IProgram;

  hostDisconnected() {
    super.hostDisconnected();

    this.deleteSelectedProgram();
  }

  get money(): number {
    return this.globalState.money.money;
  }

  get ram(): number {
    return this.mainframeState.hardware.ram.totalLevel;
  }

  get cores(): number {
    return this.mainframeState.hardware.cores.totalLevel;
  }

  getSelectedProgram(name: ProgramName, level: number, quality: number): IProgram {
    if (
      this._selectedProgram?.name !== name ||
      this._selectedProgram.level !== level ||
      this._selectedProgram.quality !== quality
    ) {
      this.deleteSelectedProgram();

      this._selectedProgram = this.mainframeState.programFactory.makeProgram({
        name,
        level,
        quality,
        autoUpgradeEnabled: true,
      });
    }

    return this._selectedProgram;
  }

  getOwnedProgram(name: ProgramName): IProgram | undefined {
    return this.mainframeState.programs.getOwnedProgramByName(name);
  }

  getProgramCost(programName: ProgramName, quality: number, level: number): number {
    return this.mainframeState.programs.getProgramCost(programName, quality, level);
  }

  private deleteSelectedProgram() {
    if (this._selectedProgram) {
      this._selectedProgram.removeAllEventListeners();
    }
  }
}
