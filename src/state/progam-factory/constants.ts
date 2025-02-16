import { ProgramName, OtherProgramName, MultiplierProgramName } from './types';

export const PROGRAMS: ProgramName[] = [...Object.values(OtherProgramName), ...Object.values(MultiplierProgramName)];

export const PROGRAMS_UI_EVENTS = {
  PROGRAM_UPGRADED: Symbol('PROGRAM_UPGRADED'),
};
