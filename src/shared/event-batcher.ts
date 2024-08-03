import { EventEmitter } from 'eventemitter3';
import { IEventBatcher } from './interfaces/event-batcher';

export class EventBatcher implements IEventBatcher {
  private readonly _eventMap: Map<string | symbol, any[]>;
  private readonly _eventEmitter: EventEmitter;

  constructor() {
    this._eventMap = new Map<string | symbol, any[]>();
    this._eventEmitter = new EventEmitter();
  }

  fireEvents(): void {
    for (const [eventType, args] of this._eventMap.entries()) {
      //eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this._eventEmitter.emit(eventType, ...args);
    }

    this._eventMap.clear();
  }

  enqueueEvent(eventType: string | symbol, ...args: any[]): void {
    this._eventMap.set(eventType, args);
  }

  addEventListener(eventType: string | symbol, listener: (...args: any[]) => void): void {
    this._eventEmitter.addListener(eventType, listener);
  }

  removeEventListener(eventType: string | symbol, listener: (...args: any[]) => void): void {
    this._eventEmitter.removeListener(eventType, listener);
  }
}
