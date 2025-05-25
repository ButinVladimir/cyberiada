import { ProgramName } from '../types';
import { IBaseProgramParameters } from './base-program-parameters';

export interface IMakeProgramParameters extends IBaseProgramParameters {
  name: ProgramName;
}
