import { createContext } from '@lit/context';
import { IClone } from '@state/company-state';

export const temporaryCloneContext = createContext<IClone>(Symbol('TEMPORARY_CLONE'));
