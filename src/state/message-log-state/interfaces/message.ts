import { MessageEvent } from '@shared/types';

export interface IMessage {
  id: string;
  date: Date;
  event: MessageEvent;
  parameters?: Record<string, any>;
}
