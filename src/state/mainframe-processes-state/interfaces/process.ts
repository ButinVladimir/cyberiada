import { IProgram } from '@state/progam-factory/interfaces/program';
import { ISerializedProcess } from './serialized-process';

export interface IProcess {
  program: IProgram;
  isActive: boolean;
  threads: number;
  currentCompletionPoints: number;
  maxCompletionPoints: number;
  toggleActive(active: boolean): void;
  getTotalRam(): number;
  increaseCompletion(usedCores: number): void;
  resetCompletion(): void;
  serialize(): ISerializedProcess;
}
