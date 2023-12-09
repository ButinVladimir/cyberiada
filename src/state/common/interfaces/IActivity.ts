import { IPerson } from './IPerson';

export interface IActivity {
  isActive: boolean;
  assignedPersons: IPerson[];

  processTick(tickTime: number): void;
  processFinish(): void;
  checkIsFinished(): boolean;
}
