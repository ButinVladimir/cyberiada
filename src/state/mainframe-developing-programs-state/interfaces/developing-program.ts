import { IProgram } from '@state/progam-factory/interfaces/program';
import { ISerializedDevelopingProgram } from './serialized-developing-program';

export interface IDevelopingProgram {
  program: IProgram;
  isActive: boolean;
  currentDevelopmentPoints: number;
  toggleActive(active: boolean): void;
  increaseDevelopment(delta: number): void;
  serialize(): ISerializedDevelopingProgram;
}
