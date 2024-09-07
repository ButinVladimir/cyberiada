import { ProgramName } from './types';

export const PROGRAMS: ProgramName[] = Object.values(ProgramName);

export const PROGRAMS_UI_EVENTS = {
  PROGRAM_UPDATED: Symbol('PROGRAM_UPDATED'),
};

export const PROGRAMS_STATE_EVENTS = {
  PROGRAM_UPDATED: Symbol('PROGRAM_UPDATED'),
};
