import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { ISerializeable, IUIEventEmitter } from '@shared/interfaces';
import { IProcess } from './process';
import { IMainframeProcessesSerializedState } from './mainframe-processes-serialized-state';

export interface IMainframeProcessesState extends ISerializeable<IMainframeProcessesSerializedState>, IUIEventEmitter {
  availableCores: number;
  availableRam: number;
  runningScalableProcess: IProcess | undefined;
  listProcesses(): IProcess[];
  getProcessByName(programName: ProgramName): IProcess | undefined;
  addProcess(programName: ProgramName, threads: number): boolean;
  toggleAllProcesses(active: boolean): void;
  deleteProcess(programName: ProgramName): void;
  deleteAllProcesses(): void;
  requestUpdateProcesses(): void;
  processTick(): void;
  moveProcess(programName: ProgramName, newPosition: number): void;
}
