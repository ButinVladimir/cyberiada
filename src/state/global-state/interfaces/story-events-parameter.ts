import { ISerializeable } from '@shared/interfaces/serializable';
import { IStoryEventsSerializedParameter } from './serialized-states';
import { IStoryEvent } from '@state/scenario-state';

export interface IStoryEventsParameter extends ISerializeable<IStoryEventsSerializedParameter> {
  visitEvents(): void;
  listAvailableGoals(): IStoryEvent[];
}
