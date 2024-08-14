import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IMessage } from './message';
import { GameStateEvent } from '@shared/types';

export interface IMessageLogState extends IUIEventEmitter {
  postMessage(event: GameStateEvent, parameters?: Record<string, any>): void;
  getMessages(): IMessage[];
  clearMessages(): void;
}
