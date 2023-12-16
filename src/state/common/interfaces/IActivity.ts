import { IPerson } from './IPerson';

export interface IActivity {
  id: string;
  assignedPersons: IPerson[];

  processTick(tickTime: number): void;
  processFinish(): void;
  checkIsFinished(): boolean;
  checkIsApplicable(): boolean;
}
