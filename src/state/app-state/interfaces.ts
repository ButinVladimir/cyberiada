import { EventEmitter } from 'eventemitter3';
import { AppStateValue } from './types';

export interface IAppState {
  eventEmitter: EventEmitter;
  currentState: AppStateValue;
  startGame(): void;
}
