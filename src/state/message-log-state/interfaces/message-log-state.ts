import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IMessage } from './message';
import { MessageEvent } from '@shared/types';

export interface IMessageLogState extends IUIEventEmitter {
  postMessage(event: MessageEvent, parameters?: Record<string, any>, postToast?: boolean): void;
  getMessages(): IMessage[];
  clearMessages(): void;
  getToasts(): IMessage[];
}
