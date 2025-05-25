import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { ISerializeable } from '@shared/interfaces';
import { IProcess } from './process';
import { IMainframeProcessesSerializedState } from './mainframe-processes-serialized-state';
import { IProcessCompletionSpeedParameter } from './process-completion-speed-parameter';

export interface IMainframeProcessesState extends ISerializeable<IMainframeProcessesSerializedState> {
  availableCores: number;
  availableRam: number;
  runningScalableProcess: IProcess | undefined;
  processCompletionSpeed: IProcessCompletionSpeedParameter;
  listProcesses(): IProcess[];
  getProcessByName(programName: ProgramName): IProcess | undefined;
  addProcess(programName: ProgramName, threads: number): boolean;
  toggleAllProcesses(active: boolean): void;
  deleteProcess(programName: ProgramName): void;
  deleteAllProcesses(): void;
  requestUpdateProcesses(): void;
  requestUpdatePerformance(): void;
  processTick(): void;
  moveProcess(programName: ProgramName, newPosition: number): void;
  getAvailableRamForProgram(programName: ProgramName): number;
}
