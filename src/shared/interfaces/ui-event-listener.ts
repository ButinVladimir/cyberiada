import { IUIEventEmitter } from './ui-event-emitter';

export interface IUIEventListener {
  addEventListener(eventEmitter: IUIEventEmitter, eventName: symbol): void;
  removeEventListenersByEmitter(eventEmitter: IUIEventEmitter): void;
  removeAllEventListeners(): void;
  startRendering(): void;
  stopRendering(): void;
}
