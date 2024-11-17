import { EventEmitter } from 'eventemitter3';
import { IEventBatcher } from './interfaces/event-batcher';

export class EventBatcher implements IEventBatcher {
  private readonly _eventSet: Set<symbol>;
  private readonly _eventEmitter: EventEmitter;

  constructor() {
    this._eventSet = new Set<symbol>();
    this._eventEmitter = new EventEmitter();
  }

  fireEvents(): void {
    for (const eventType of this._eventSet.values()) {
      this._eventEmitter.emit(eventType);
    }

    this._eventSet.clear();
  }

  enqueueEvent(eventType: symbol): void {
    this._eventSet.add(eventType);
  }

  addListener(eventType: symbol, listener: () => void): void {
    this._eventEmitter.addListener(eventType, listener);
  }

  removeListener(eventType: symbol, listener: () => void): void {
    this._eventEmitter.removeListener(eventType, listener);
  }

  removeAllListeners(): void {
    this._eventEmitter.removeAllListeners();
  }
}
