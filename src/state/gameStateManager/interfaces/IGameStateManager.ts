import { IGlobalState } from '@state/gameState';
import { Events } from '@state/common';
import { Callback } from '../types';

export interface IGameStateManager {
  globalState: IGlobalState;
  timer: NodeJS.Timeout | null;
  callbacks: Map<string, Set<Callback>>;

  tick: () => Promise<void>;
  changeSpeed: (newSpeed: number) => Promise<void>;
  on: (eventName: Events, callback: Callback) => void;
  off: (eventName: Events, callback: Callback) => void;
  emit: (eventName: Events) => Promise<void>;
}