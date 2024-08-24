import { ProgramName } from '@state/progam-factory/types';
import { BaseController } from '@shared/base-controller';

export class ProcessActionsColumnController extends BaseController {
  toggleProcess(programName: ProgramName, active: boolean): void {
    const process = this.mainframeProcessesState.getProcessByName(programName);
    process.toggleActive(active);
  }

  deleteProcess(programName: ProgramName): void {
    this.mainframeProcessesState.deleteProcess(programName);
  }

  handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
