import { ProgramName } from './types';

export const PROGRAMS: ProgramName[] = Object.values(ProgramName);

export const PROGRAMS_UI_EVENTS = {
  PROGRAM_UPDATED: Symbol('PROGRAM_UPDATED'),
};
