import { ProgramName } from '@state/progam-factory/types';
import { BaseController } from '@shared/base-controller';

export class DevelopingProgramActionsColumnController extends BaseController {
  toggleDevelopingProgram(programName: ProgramName, active: boolean): void {
    const developingProgram = this.mainframeDevelopingProgramsStart.getDevelopingProgramByName(programName);
    developingProgram.toggleActive(active);
  }

  deleteDevelopingProgram(programName: ProgramName): void {
    this.mainframeDevelopingProgramsStart.deleteDevelopingProgram(programName);
  }

  handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
