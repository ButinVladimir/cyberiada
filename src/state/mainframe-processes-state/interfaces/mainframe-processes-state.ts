import { ProgramName } from '@state/progam-factory/types';
import { ISerializeable, IUIEventEmitter } from '@shared/interfaces';
import { IProcess } from './process';
import { IMainframeProcessesSerializedState } from './mainframe-processes-serialized-state';

export interface IMainframeProcessesState extends ISerializeable<IMainframeProcessesSerializedState>, IUIEventEmitter {
  availableCores: number;
  availableRam: number;
  listProcesses(): IProcess[];
  getProcessByName(programName: ProgramName): IProcess;
  addProcess(programName: ProgramName, threads: number): boolean;
  deleteProcess(programName: ProgramName): void;
  updateRunningProcesses(): void;
  processTick(): void;
}
