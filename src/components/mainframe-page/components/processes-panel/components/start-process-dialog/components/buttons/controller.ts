import { BaseController } from '@shared/base-controller';
import { IProcess, ProgramName } from '@state/mainframe-state';

export class StartProcessDialogButtonsController extends BaseController {
  getAvailableRamForProgram(programName: ProgramName) {
    return this.mainframeState.processes.getAvailableRamForProgram(programName);
  }

  getRunningScalableProgram(): IProcess | undefined {
    return this.mainframeState.processes.runningScalableProcess;
  }
}
