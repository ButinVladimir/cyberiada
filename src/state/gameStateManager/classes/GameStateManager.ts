import { makeAutoObservable, reaction } from 'mobx';
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

  timer: NodeJS.Timeout | null = null;
  lastTimeUpdate = 0;

  constructor() {
    makeAutoObservable(this);

    this.lastTimeUpdate = performance.now();

    reaction(
      () => this.settingsState.gameUpdateInterval,
      (gameUpdateInterval) => {
        if (this.timer) {
          clearInterval(this.timer);
        }

        this.timer = setInterval(this.processTick, gameUpdateInterval);
      },
    );
  }

  private processTick = () => {
    const currentTime = performance.now();
    const timeDelta = Math.max(currentTime - this.lastTimeUpdate, 0);
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
      Math.floor(this.globalState.bonusTime / this.settingsState.gameUpdateInterval),
    );

    for (let tick = 0; tick < maxTicks; tick++) {
      this.processSingleTick();
    }
  };

  private processSingleTick = () => {
    this.globalState.changeBonusTime(-this.settingsState.gameUpdateInterval);
    this.globalState.changeMoney(this.settingsState.gameUpdateInterval);
    this.globalState.changeCredibility(this.settingsState.gameUpdateInterval);
  };
}
