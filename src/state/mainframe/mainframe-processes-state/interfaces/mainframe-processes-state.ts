import { ProgramName } from '@state/progam-factory/types';
import { ISerializeable, IUIEventEmitter } from '@shared/interfaces';
import { IProcess } from './process';
import { IMainframeProcessesSerializedState } from './mainframe-processes-serialized-state';

export interface IMainframeProcessesState extends ISerializeable<IMainframeProcessesSerializedState>, IUIEventEmitter {
  availableCores: number;
  availableRam: number;
  runningScalableProgram: ProgramName | undefined;
  listProcesses(): ProgramName[];
  getProcessByName(programName: ProgramName): IProcess | undefined;
  addProcess(programName: ProgramName, threads: number): boolean;
  toggleAllProcesses(active: boolean): void;
  deleteProcess(programName: ProgramName): void;
  deleteAllProcesses(): void;
  requestUpdateProcesses(): void;
  processTick(): void;
}
