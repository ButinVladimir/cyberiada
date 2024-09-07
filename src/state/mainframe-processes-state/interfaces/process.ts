import { IProgram } from '@state/progam-factory/interfaces/program';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IStateEventEmitter } from '@shared/interfaces/state-event-emitter';
import { ISerializedProcess } from './serialized-process';

export interface IProcess extends IUIEventEmitter, IStateEventEmitter {
  program: IProgram;
  isActive: boolean;
  threads: number;
  usedCores: number;
  currentCompletionPoints: number;
  maxCompletionPoints: number;
  totalRam: number;
  toggleActive(active: boolean): void;
  increaseCompletion(): void;
  resetCompletion(): void;
  calculateCompletionDelta(passedTime: number): number;
  update(threads: number): void;
  serialize(): ISerializedProcess;
  removeEventListeners(): void;
}
