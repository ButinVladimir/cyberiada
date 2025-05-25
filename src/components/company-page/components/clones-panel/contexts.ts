import { IClone } from '@state/company-state';
import { createContext } from '@lit/context';

export const modalCloneContext = createContext<IClone>(Symbol('MODAL_CLONE'));
