import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { PROGRAMS_UI_EVENTS } from '@state/progam-factory/constants';
import { ProgramName } from '@state/progam-factory/types';

export class OwnedProgramsListItemController extends BaseController {
  private _ownedProgram?: IProgram;

  hostConnected() {}

  hostDisconnected() {
    this.removeOldProgramListeners();
  }

  getProgram(programName: ProgramName) {
    if (this._ownedProgram?.name !== programName) {
      this.removeOldProgramListeners();

      this._ownedProgram = this.mainframeOwnedProgramState.getOwnedProgramByName(programName);

      this._ownedProgram?.addUiEventListener(PROGRAMS_UI_EVENTS.PROGRAM_UPDATED, this.handleRefreshUI);
    }

    return this._ownedProgram;
  }

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };

  private removeOldProgramListeners() {
    this._ownedProgram?.removeUiEventListener(PROGRAMS_UI_EVENTS.PROGRAM_UPDATED, this.handleRefreshUI);
  }
}
