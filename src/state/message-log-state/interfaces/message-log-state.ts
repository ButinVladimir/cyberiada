import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IMessage } from './message';
import { MessageFilterEvent } from '@shared/types';

export interface IMessageLogState extends IUIEventEmitter {
  postMessage(event: MessageFilterEvent, parameters?: Record<string, any>): void;
  getMessages(): IMessage[];
  clearMessages(): void;
}
