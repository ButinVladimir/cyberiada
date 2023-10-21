import { makeAutoObservable } from 'mobx';
import { GlobalState, CrewState } from '@/state/gameState';
import { IGameStateManager } from '../interfaces';

export class GameStateManager implements IGameStateManager {
  globalState = new GlobalState();
  crewState = new CrewState();

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
