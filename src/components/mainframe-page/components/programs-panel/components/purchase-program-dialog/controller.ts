import { BaseController } from '@shared/base-controller';
import { IProgram, ProgramName } from '@state/mainframe-state';

export class PurchaseProgramDialogController extends BaseController {
  private _selectedProgram?: IProgram;

  hostDisconnected() {
    super.hostDisconnected();

    this.deleteSelectedProgram();
  }

  get developmentLevel(): number {
    return this.globalState.development.level;
  }

  getSelectedProgram(name: ProgramName, quality: number, level: number): IProgram {
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

  getHighestAvailableQuality(programName: ProgramName): number {
    return this.globalState.availableItems.programs.getItemHighestAvailableQuality(programName);
  }

  listAvailablePrograms(): ProgramName[] {
    return this.globalState.availableItems.programs.listAvailableItems();
  }

  purchaseProgram(name: ProgramName, quality: number, level: number): boolean {
    return this.mainframeState.programs.purchaseProgram(name, quality, level);
  }

  private deleteSelectedProgram() {
    if (this._selectedProgram) {
      this._selectedProgram.removeAllEventListeners();
    }
  }
}
