import { MAINFRAME_PROGRAMS_STATE_UI_EVENTS } from '@/state/mainframe/mainframe-programs-state/constants';
import { MAINFRAME_HARDWARE_STATE_UI_EVENTS } from '@state/mainframe/mainframe-hardware-state/constants';
import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';
import { IProcess } from '@state/mainframe/mainframe-processes-state/interfaces/process';

export class StartProcessDialogController extends BaseController {
  hostConnected() {
    this.mainframeProgramsState.addUiEventListener(
      MAINFRAME_PROGRAMS_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED,
      this.handleRefreshUI,
    );
    this.mainframeHardwareState.addUiEventListener(
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPGRADED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.mainframeProgramsState.removeUiEventListener(
      MAINFRAME_PROGRAMS_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED,
      this.handleRefreshUI,
    );
    this.mainframeHardwareState.removeUiEventListener(
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPGRADED,
      this.handleRefreshUI,
    );
  }

  get ram(): number {
    return this.mainframeHardwareState.ram.level;
  }

  get cores(): number {
    return this.mainframeHardwareState.cores.level;
  }

  getAvailableRamForProgram(programName?: ProgramName): number {
    let availableRam = this.mainframeProcessesState.availableRam;

    if (programName) {
      const existingProcess = this.mainframeProcessesState.getProcessByName(programName);

      if (existingProcess) {
        availableRam += existingProcess.totalRam;
      }
    }

    return availableRam;
  }

  listPrograms(): IProgram[] {
    return this.mainframeProgramsState.listOwnedPrograms();
  }

  getProgram(name: ProgramName): IProgram | undefined {
    return this.mainframeProgramsState.getOwnedProgramByName(name)!;
  }

  getRunningScalableProgram(): ProgramName | undefined {
    return this.mainframeProcessesState.runningScalableProgram;
  }

  getProcessByName(name: ProgramName): IProcess | undefined {
    return this.mainframeProcessesState.getProcessByName(name);
  }

  startProcess(name: ProgramName, threads: number): boolean {
    return this.mainframeProcessesState.addProcess(name, threads);
  }
}
