import { MessageEvent } from '@shared/types';

export interface IMessage {
  id: string;
  event: MessageEvent;
  messageText: string;
}
