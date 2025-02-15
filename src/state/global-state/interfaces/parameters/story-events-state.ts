import { IStoryEvent } from '../story-event';

export interface IStoryEventsState {
  visitEvents(prevLevel: number): void;
  listAvailableGoals(): IStoryEvent[];
  startNewState(): void;
}
