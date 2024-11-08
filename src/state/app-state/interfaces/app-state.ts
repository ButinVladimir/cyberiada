import { ISerializeable } from '@shared/interfaces/serializable';

export interface IAppState extends ISerializeable<string> {
  updateState(): void;
  fastForwardState(): boolean;
  fireUiEvents(): void;
}
