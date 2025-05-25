import { ISidejob } from '@state/company-state';
import { createContext } from '@lit/context';

export const temporarySidejobContext = createContext<ISidejob | undefined>(Symbol('TEMPORARY_SIDEJOB'));
export const existingSidejobContext = createContext<ISidejob | undefined>(Symbol('EXISTING_SIDEJOB'));
