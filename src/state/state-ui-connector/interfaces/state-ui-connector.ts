import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IUIEventListener } from '@shared/interfaces/ui-event-listener';

export interface IStateUIConnector {
  pushEventListener(eventListener: IUIEventListener): void;
  popEventListener(): void;
  connectEventHandler(eventEmitter: IUIEventEmitter, event: symbol): void;
  registerEventEmitter(eventEmitter: IUIEventEmitter): void;
  unregisterEventEmitter(eventEmitter: IUIEventEmitter): void;
  fireUIEvents(): void;
}
