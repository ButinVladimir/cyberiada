import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IStoryGoal } from '../story-goal';

export interface IStoryEventsState extends IUIEventEmitter {
  visitEventsByLevel(prevLevel: number): void;
  listGoals(): IStoryGoal[];
  startNewState(): void;
}
