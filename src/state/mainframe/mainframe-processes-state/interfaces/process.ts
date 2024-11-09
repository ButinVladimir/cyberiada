import { IProgram } from '@state/progam-factory/interfaces/program';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializedProcess } from './serialized-process';

export interface IProcess extends IUIEventEmitter {
  program: IProgram;
  isActive: boolean;
  threads: number;
  usedCores: number;
  maxCores: number;
  currentCompletionPoints: number;
  maxCompletionPoints: number;
  totalRam: number;
  calculateCompletionDelta(passedTime: number): number;
  calculateCompletionTime(): number;
  toggleActive(active: boolean): void;
  increaseCompletion(delta: number): void;
  resetCompletion(): void;
  update(threads: number): void;
  serialize(): ISerializedProcess;
  removeEventListeners(): void;
}
