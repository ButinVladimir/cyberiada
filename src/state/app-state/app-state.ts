import 'reflect-metadata';
import { EventEmitter } from 'eventemitter3';
import { injectable } from 'inversify';
import { IAppState } from "./interfaces";
import { AppStateValue } from './types';
import { APP_EVENTS } from './constants';

@injectable()
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
      this.eventEmitter.emit(APP_EVENTS.loaded);
    }, 1000);
  }
}