import { makeAutoObservable } from 'mobx';
import { GlobalState } from '@/state/gameState';
import { IGameStateManager } from '../interfaces';

export class GameStateManager implements IGameStateManager {
  globalState = new GlobalState();
  timer: NodeJS.Timeout | null = null;

  constructor() {
    makeAutoObservable(this, {
      timer: false,
      tick: false,
    });

    this.timer = setInterval(this.tick, 1000);
  }

  tick = () => {
    this.globalState.updateTime();
  };
}
