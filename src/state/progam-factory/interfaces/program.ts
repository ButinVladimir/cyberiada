import { ProgramName } from '../types';
import { IMakeProgramParameters } from './make-program-parameters';

export interface IProgram {
  name: ProgramName;
  level: number;
  quality: number;
  isRepeatable: boolean;
  perform(cores: number, ram: number): void;
  getCost(): number;
  getRam(): number;
  getCores(): number;
  serialize(): IMakeProgramParameters;
}
