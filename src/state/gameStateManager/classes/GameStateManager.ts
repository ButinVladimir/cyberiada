import { GlobalState } from '@/state/gameState';
import { Events } from '@state/common';
import { IGameStateManager } from '../interfaces';
import { Callback } from '../types';

export class GameStateManager implements IGameStateManager {
  globalState = new GlobalState();
  timer: NodeJS.Timeout | null = null;
  callbacks = new Map<string, Set<Callback>>();

  constructor() {
    this.timer = setInterval(this.tick, 1000);
  }

  tick = async (): Promise<void> => {
    this.globalState.updateTime();
    await this.emit(Events.GlobalStateUpdated);
  };

  changeSpeed = async (newSpeed: number): Promise<void> => {
    this.globalState.changeSpeed(newSpeed);
    await this.emit(Events.GlobalStateUpdated);
  };

  on = (eventName: Events, callback: () => Promise<void>) => {
    const set = this.callbacks.get(eventName) || new Set<Callback>();
    
    if (!set.has(callback)) {
      set.add(callback);
    }

    this.callbacks.set(eventName, set);
  };

  off = (eventName: Events, callback: () => Promise<void>) => {
    this.callbacks.get(eventName)?.delete(callback);
  };

  emit = async (eventName: Events): Promise<void> => {
    const eventCallbacks = this.callbacks.get(eventName)?.values();
    
    if (!eventCallbacks) {
      return;
    }

    for (const callback of eventCallbacks) {
      await callback();
    }
  }
}
