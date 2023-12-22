import { IPerson } from './IPerson';

export interface IActivity {
  id: string;
  assignedPersons: IPerson[];
  attemptsLeft: number;

  processTick(tickTime: number): void;
  processFinish(): void;
  checkIsFinished(): boolean;
  checkIsApplicable(): boolean;
}
