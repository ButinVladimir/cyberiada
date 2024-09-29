import { BaseController } from '@shared/base-controller';
import { ProgramName } from '@state/progam-factory/types';
import { MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS } from '@state/mainframe-developing-programs-state/constants';
import { IDevelopingProgram } from '@state/mainframe-developing-programs-state/interfaces/developing-program';
import { CodeGeneratorProgram } from '@state/progam-factory/programs/code-generator';
import { MAINFRAME_PROCESSES_STATE_UI_EVENTS } from '@state/mainframe-processes-state/constants';

export class DevelopingProgramsListItemProgressController extends BaseController {
  private _developingProgram?: IDevelopingProgram;

  hostConnected() {
    this.addDevelopingProgramListeners();
  }

  hostDisconnected() {
    this.removeDevelopingProgramListeners();
  }

  getDevelopingProgram(programName: ProgramName) {
    if (this._developingProgram?.program.name !== programName) {
      this.removeDevelopingProgramListeners();

      this._developingProgram = this.mainframeDevelopingProgramsState.getDevelopingProgramByName(programName);

      this.addDevelopingProgramListeners();
    }

    return this._developingProgram;
  }

  getProgressDelta(): number {
    let delta = 0;
    const codeGeneratorProcess = this.mainframeProcessesState.getProcessByName(ProgramName.codeGenerator);

    if (codeGeneratorProcess) {
      const codeGeneratorProgram = codeGeneratorProcess.program as CodeGeneratorProgram;
      const completionTime =
        codeGeneratorProcess.maxCompletionPoints / codeGeneratorProcess.calculateCompletionDelta(1);

      delta += codeGeneratorProgram.calculateDelta(codeGeneratorProcess.threads) / completionTime;
    }

    return delta;
  }

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };

  private addDevelopingProgramListeners() {
    this._developingProgram?.addUiEventListener(
      MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAM_UPDATED,
      this.handleRefreshUI,
    );
    this._developingProgram?.addUiEventListener(
      MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAM_PROGRESS_UPDATED,
      this.handleRefreshUI,
    );
    this.mainframeProcessesState.addUiEventListener(
      MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED,
      this.handleRefreshUI,
    );
  }

  private removeDevelopingProgramListeners() {
    this._developingProgram?.removeUiEventListener(
      MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAM_UPDATED,
      this.handleRefreshUI,
    );
    this._developingProgram?.removeUiEventListener(
      MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAM_PROGRESS_UPDATED,
      this.handleRefreshUI,
    );
    this.mainframeProcessesState.removeUiEventListener(
      MAINFRAME_PROCESSES_STATE_UI_EVENTS.PROCESSES_UPDATED,
      this.handleRefreshUI,
    );
  }
}
