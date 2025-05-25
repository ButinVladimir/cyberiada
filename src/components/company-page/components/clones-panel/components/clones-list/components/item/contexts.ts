import { IClone } from '@state/company-state';
import { createContext } from '@lit/context';

export const cloneContext = createContext<IClone>(Symbol('CLONE'));
