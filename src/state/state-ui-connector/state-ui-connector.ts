import { injectable } from 'inversify';
import { IUIEventListener, IUIEventEmitter } from '@shared/interfaces';
import { IStateUIConnector } from './interfaces';

@injectable()
export class StateUIConnector implements IStateUIConnector {
  private _eventListenerStack: IUIEventListener[];

  private _registeredEventEmitters: Set<IUIEventEmitter>;

  constructor() {
    this._eventListenerStack = [];
    this._registeredEventEmitters = new Set<IUIEventEmitter>();
  }

  pushEventListener(eventListener: IUIEventListener): void {
    this._eventListenerStack.push(eventListener);
  }

  popEventListener(): void {
    this._eventListenerStack.pop();
  }

  connectEventHandler(eventEmitter: IUIEventEmitter, event: symbol): void {
    if (this._eventListenerStack.length > 0) {
      const eventListener = this._eventListenerStack[this._eventListenerStack.length - 1];

      eventListener.addEventListener(eventEmitter, event);
    }
  }

  registerEventEmitter(eventEmitter: IUIEventEmitter): void {
    this._registeredEventEmitters.add(eventEmitter);
  }

  unregisterEventEmitter(eventEmitter: IUIEventEmitter): void {
    this._registeredEventEmitters.delete(eventEmitter);

    eventEmitter.uiEventBatcher.removeAllListeners();
  }

  fireUIEvents(): void {
    for (const eventEmitter of this._registeredEventEmitters.values()) {
      eventEmitter.uiEventBatcher.fireEvents();
    }
  }
}
