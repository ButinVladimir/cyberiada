import { EventEmitter } from 'eventemitter3'
import { IAppState } from "./interfaces";
import { AppStateValue } from './types';
import { events } from './constants';

export class AppState implements IAppState {
  private _currentState: AppStateValue;
  public readonly eventEmitter: EventEmitter;

  constructor() {
    this._currentState = AppStateValue.loading;
    this.eventEmitter = new EventEmitter();
  }

  get currentState() {
    return this._currentState;
  }

  startGame(): void {
    setTimeout(() => {
      this._currentState = AppStateValue.running;
      this.eventEmitter.emit(events.loaded);
    }, 10000);
  }
}