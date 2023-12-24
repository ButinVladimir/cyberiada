import { IPerson } from './IPerson';

export interface IActivity {
  id: string;
  assignedPersons: IPerson[];
  attemptsLeft: number;
  isActive: boolean;

  processTick(tickTime: number): void;
  processFinish(): void;
  checkIsFinished(): boolean;
  checkIsApplicable(): boolean;
}
