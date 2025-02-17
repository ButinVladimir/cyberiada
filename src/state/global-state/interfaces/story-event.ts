import { Feature } from '@shared/types';

export interface IStoryEvent {
  key: string;
  level: number;
  unlockFeatures?: Feature[];
  messages?: string[];
}
