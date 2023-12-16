import { ISideJobSearch } from './ISideJobSearch';

export interface ISideJobSearchFree extends ISideJobSearch {
  timeToFinish: number;
  timeLeft: number;
}
