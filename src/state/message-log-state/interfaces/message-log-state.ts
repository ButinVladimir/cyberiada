import { IMessage } from './message';
import { MessageEvent } from '@shared/types';

export interface IMessageLogState {
  postMessage(event: MessageEvent, messageText: string, postToast?: boolean): void;
  getMessages(): IMessage[];
  clearMessages(): void;
  getToasts(): IMessage[];
}
