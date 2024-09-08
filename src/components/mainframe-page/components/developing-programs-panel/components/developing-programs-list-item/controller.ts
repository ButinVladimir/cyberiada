import { BaseController } from '@shared/base-controller';
import { ProgramName } from '@state/progam-factory/types';
import { IDevelopingProgram } from '@state/mainframe-developing-programs-state/interfaces/developing-program';
import { MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS } from '@state/mainframe-developing-programs-state/constants';

export class DevelopingProgramsListItemController extends BaseController {
  private _developingProgram?: IDevelopingProgram;

  hostConnected() {}

  hostDisconnected() {
    this.removeOldDevelopingProgramListeners();
  }

  getDevelopingProgram(programName: ProgramName) {
    if (this._developingProgram?.program.name !== programName) {
      this.removeOldDevelopingProgramListeners();

      this._developingProgram = this.mainframeDevelopingProgramsState.getDevelopingProgramByName(programName);

      this._developingProgram?.addUiEventListener(
        MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAM_UPDATED,
        this.handleRefreshUI,
      );
    }

    return this._developingProgram;
  }

  toggleDevelopingProgram(): void {
    if (this._developingProgram) {
      this._developingProgram.toggleActive(!this._developingProgram.isActive);
    }
  }

  deleteDevelopingProgram(): void {
    if (this._developingProgram) {
      this.mainframeDevelopingProgramsState.deleteDevelopingProgram(this._developingProgram.program.name);
    }
  }

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };

  private removeOldDevelopingProgramListeners() {
    this._developingProgram?.removeUiEventListener(
      MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAM_UPDATED,
      this.handleRefreshUI,
    );
  }
}
