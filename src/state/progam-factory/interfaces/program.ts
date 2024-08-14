import { ProgramName } from '../types';
import { IMakeProgramParameters } from './make-program-parameters';

export interface IProgram {
  name: ProgramName;
  level: number;
  quality: number;
  perform(cores: number): boolean;
  serialize(): IMakeProgramParameters;
}
