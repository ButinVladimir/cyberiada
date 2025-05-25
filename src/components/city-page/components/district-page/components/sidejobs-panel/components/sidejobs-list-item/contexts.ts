import { createContext } from '@lit/context';
import { SidejobName } from '@state/company-state';

export const sidejobNameContext = createContext<SidejobName>(Symbol('SIDEJOB_NAME'));
