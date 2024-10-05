import { ProgramName } from '@state/progam-factory/types';

export interface ISerializedDevelopingProgram {
  programName: ProgramName;
  level: number;
  quality: number;
  isActive: boolean;
  currentDevelopmentPoints: number;
}
