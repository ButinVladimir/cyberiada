import { GENERAL_STATE_UI_EVENTS } from '@state/general-state/constants';
import { GROWTH_STATE_UI_EVENTS } from '@state/growth-state/constants';
import { MAINFRAME_OWNED_PROGRAMES_STATE_UI_EVENTS } from '@state/mainframe/mainframe-owned-programs-state';
import { PROGRAMS_UI_EVENTS } from '@state/progam-factory/constants';
import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';

export class PurchaseProgramDialogController extends BaseController {
  private _selectedProgram?: IProgram;

  hostConnected() {
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.CITY_LEVEL_CHANGED, this.handleRefreshUI);
    this.mainframeOwnedProgramState.addUiEventListener(
      MAINFRAME_OWNED_PROGRAMES_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED,
      this.handleRefreshUI,
    );
    this.growthState.addUiEventListener(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.CITY_LEVEL_CHANGED, this.handleRefreshUI);
    this.mainframeOwnedProgramState.removeUiEventListener(
      MAINFRAME_OWNED_PROGRAMES_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED,
      this.handleRefreshUI,
    );
    this.growthState.removeUiEventListener(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED, this.handleRefreshUI);

    if (this._selectedProgram) {
      this.programFactory.deleteProgram(this._selectedProgram);
    }
  }

  get cityLevel(): number {
    return this.generalState.cityLevel;
  }

  getSelectedProgram(name: ProgramName, level: number, quality: number): IProgram {
    if (
      this._selectedProgram?.name !== name ||
      this._selectedProgram.level !== level ||
      this._selectedProgram.quality !== quality
    ) {
      if (this._selectedProgram) {
        this.programFactory.deleteProgram(this._selectedProgram);
      }

      this._selectedProgram = this.programFactory.makeProgram({
        name,
        level,
        quality,
      });

      this._selectedProgram.addUiEventListener(PROGRAMS_UI_EVENTS.PROGRAM_UPDATED, this.handleRefreshUI);
    }

    return this._selectedProgram;
  }

  getOwnedProgram(name: ProgramName): IProgram | undefined {
    return this.mainframeOwnedProgramState.getOwnedProgramByName(name);
  }

  purchaseProgram(name: ProgramName, level: number, quality: number): boolean {
    return this.mainframeOwnedProgramState.purchaseProgram({
      name,
      level,
      quality,
    });
  }

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
