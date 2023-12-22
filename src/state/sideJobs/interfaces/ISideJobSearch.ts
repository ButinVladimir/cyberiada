import { IPerson } from '@state/common';
import { ISideJob } from './ISideJob';

export interface ISideJobSearch extends ISideJob {
  performingPersons: IPerson[];
  timeToFinish: number;
  timeLeft: number;
  cost: number;
  canBePaid: boolean;
  buyOut: () => void;
}
