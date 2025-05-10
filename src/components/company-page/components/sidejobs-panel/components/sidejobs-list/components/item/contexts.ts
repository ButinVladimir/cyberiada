import { createContext } from '@lit/context';
import { ISidejob } from '@state/company-state';

export const sidejobContext = createContext<ISidejob>(Symbol('Sidejob'));
