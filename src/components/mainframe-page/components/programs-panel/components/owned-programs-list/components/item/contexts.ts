import { createContext } from '@lit/context';
import { IProgram } from '@state/mainframe-state';

export const programContext = createContext<IProgram>(Symbol('PROGRAM_CONTEXT'));
