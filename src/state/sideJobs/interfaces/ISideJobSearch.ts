import { ISideJob } from './ISideJob';

export interface ISideJobSearch extends ISideJob {
  performingPersonId: string;
  isComplete: boolean;
}
