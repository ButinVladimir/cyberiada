import { Scenario } from '@shared/types';

export interface IStoryEventsSerializedParameter {
  visitedEvents: { [P in Scenario]?: string[] };
}
