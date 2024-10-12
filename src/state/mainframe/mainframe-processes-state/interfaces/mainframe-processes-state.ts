import { ProgramName } from '@state/progam-factory/types';
import { ISerializeable, IUIEventEmitter, IStateEventEmitter } from '@shared/interfaces';
import { IProcess } from './process';
import { IMainframeProcessesSerializedState } from './mainframe-processes-serialized-state';

export interface IMainframeProcessesState
  extends ISerializeable<IMainframeProcessesSerializedState>,
    IUIEventEmitter,
    IStateEventEmitter {
  availableCores: number;
  availableRam: number;
  listProcesses(): ProgramName[];
  getProcessByName(programName: ProgramName): IProcess | undefined;
  addProcess(programName: ProgramName, threads: number): boolean;
  deleteProcess(programName: ProgramName): void;
  processTick(): void;
}
