import { ProgramName } from '@state/progam-factory/types';
import { ISerializeable, IUIEventEmitter } from '@shared/interfaces';
import { IProcess } from './process';
import { IMainframeProcessesSerializedState } from './mainframe-processes-serialized-state';

export interface IMainframeProcessesState extends ISerializeable<IMainframeProcessesSerializedState>, IUIEventEmitter {
  processes: IProcess[];
  addProcess(programName: ProgramName): boolean;
  removeProcess(id: string): void;
  updateRunningProcesses(): void;
  processTick(): void;
}
