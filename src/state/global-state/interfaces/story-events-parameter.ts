import { ISerializeable } from '@shared/interfaces/serializable';
import { IStoryEventsSerializedParameter } from './serialized-states';

export interface IStoryEventsParameter extends ISerializeable<IStoryEventsSerializedParameter> {
  isEventVisited(eventKey: string): boolean;
  visitEvents(): void;
}
