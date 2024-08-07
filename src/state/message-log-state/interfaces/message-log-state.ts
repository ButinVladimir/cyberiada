import { IMessage } from './message';
import { GameStateEvent } from '@shared/types';

export interface IMessageLogState {
  postMessage(event: GameStateEvent, parameters?: Record<string, any>): void;
  getMessages(): IMessage[];
  clearMessages(): void;
  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void;
  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void;
  fireUiEvents(): void;
}
