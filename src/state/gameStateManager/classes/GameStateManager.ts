import { makeAutoObservable } from 'mobx';
import {
  GlobalState,
  CrewState,
  JobState,
  SettingsState,
} from '@/state/gameState';
import { IGameStateManager } from '../interfaces';

export class GameStateManager implements IGameStateManager {
  globalState = new GlobalState();
  crewState = new CrewState();
  jobState = new JobState();
  settingsState = new SettingsState();

  private timer: NodeJS.Timeout | null = null;
  private lastTimeUpdate = 0;

  constructor() {
    makeAutoObservable(this);

    this.timer = setInterval(this.processTick, this.settingsState.updateIntervalTime);
    this.lastTimeUpdate = performance.now();
  }

  private processTick = () => {
    const currentTime = performance.now();
    const timeDelta = currentTime - this.lastTimeUpdate;
    this.lastTimeUpdate = currentTime;

    this.globalState.changeBonusTime(timeDelta);
    let maxTicks = 0;

    switch (this.globalState.gameSpeedState) {
      case 'paused': maxTicks = 0; break;
      case 'withoutBonusTime': maxTicks = 1; break;
      case 'withBonusTime': maxTicks = this.settingsState.bonusTimeSpeed; break;
    }

    maxTicks = Math.min(
      maxTicks,
      Math.floor(this.globalState.bonusTime / this.settingsState.updateIntervalTime),
    );

    for (let tick = 0; tick < maxTicks; tick++) {
      this.processSingleTick();
    }
  };

  private processSingleTick = () => {
    this.globalState.changeBonusTime(-this.settingsState.updateIntervalTime);
    this.globalState.changeMoney(this.settingsState.updateIntervalTime);
    this.globalState.changeCredibility(this.settingsState.updateIntervalTime);
  };
}
