import { IProgram } from '@state/progam-factory/interfaces/program';
import { ISerializedProcess } from './serialized-process';

export interface IProcess {
  id: string;
  program: IProgram;
  isActive: boolean;
  currentCompletionPoints: number;
  maxCompletionPoints: number;
  toggleActive(active: boolean): void;
  increaseCompletion(cores: number): void;
  resetCompletion(): void;
  serialize(): ISerializedProcess;
}
