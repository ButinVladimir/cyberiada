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

  getSelectedProgram(name: ProgramName, tier: number, level: number): IProgram {
    if (
      this._selectedProgram?.name !== name ||
      this._selectedProgram.level !== level ||
      this._selectedProgram.tier !== tier
    ) {
      this.deleteSelectedProgram();

      this._selectedProgram = this.mainframeState.programFactory.makeProgram({
        name,
        level,
        tier,
        autoUpgradeEnabled: true,
      });
    }

    return this._selectedProgram;
  }

  getOwnedProgram(name: ProgramName): IProgram | undefined {
    return this.mainframeState.programs.getOwnedProgramByName(name);
  }

  getHighestAvailableTier(programName: ProgramName): number {
    return this.globalState.availableItems.programs.getItemHighestAvailableTier(programName);
  }

  listAvailablePrograms(): ProgramName[] {
    return this.globalState.availableItems.programs.listAvailableItems();
  }

  purchaseProgram(name: ProgramName, tier: number, level: number): boolean {
    return this.mainframeState.programs.purchaseProgram(name, tier, level);
  }

  private deleteSelectedProgram() {
    if (this._selectedProgram) {
      this._selectedProgram.removeAllEventListeners();
    }
  }
}
