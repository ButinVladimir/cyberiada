import { GameStateEvent } from '@shared/types';

export interface IMessage {
  id: string;
  date: Date;
  event: GameStateEvent;
  parameters?: Record<string, any>;
}
