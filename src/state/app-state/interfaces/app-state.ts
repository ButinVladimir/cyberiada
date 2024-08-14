import { ISerializeable } from '@shared/interfaces/serializable';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';

export interface IAppState extends ISerializeable<string>, IUIEventEmitter {
  updateState(): void;
}
