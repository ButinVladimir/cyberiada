import { BaseController } from '@shared/index';
import { ProgramName } from '@state/mainframe-state';

export class ProcessDescriptionTextController extends BaseController {
  getAvailableRamForProgram(programName: ProgramName): number {
    return this.mainframeState.processes.getAvailableRamForProgram(programName);
  }
}
