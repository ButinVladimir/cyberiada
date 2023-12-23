import { makeAutoObservable, reaction } from 'mobx';
import {
  GlobalState,
  CrewState,
  SideJobState,
  SettingsState,
} from '@state/gameState';
import { IActivity } from '@state/common';
import { SideJob, SideJobSearch } from '@state/sideJobs';
import { IGameStateManager } from '../interfaces';

export class GameStateManager implements IGameStateManager {
  globalState = new GlobalState();
  crewState = new CrewState();
  sideJobState = new SideJobState();
  settingsState = new SettingsState();

  timer: NodeJS.Timeout | null = null;
  lastTimeUpdate = 0;

  private filteredActivityIds = new Set<string>();

  constructor() {
    makeAutoObservable(this);

    this.lastTimeUpdate = performance.now();

    reaction(
      () => this.settingsState.gameUpdateInterval,
      (gameUpdateInterval) => {
        console.log(gameUpdateInterval);

        if (this.timer) {
          clearInterval(this.timer);
        }

        this.timer = setInterval(this.processTick, gameUpdateInterval);
      },
      {
        fireImmediately: true,
      },
    );
  }

  deleteActivity = (activity: IActivity): void => {
    this.crewState.activitiesInProcess = this.crewState.activitiesInProcess.filter(a => a.id !== activity.id);

    if (activity instanceof SideJobSearch) {
      this.sideJobState.deleteSideJobSearch(activity);
    }

    if (activity instanceof SideJob) {
      this.sideJobState.deleteSideJob(activity);
    }

    this.crewState.requestActivityReassignment();
  };

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

    this.crewState.activitiesInProcess.forEach((activity) => {
      if (activity.checkIsFinished()) {
        activity.processFinish();
        this.crewState.requestActivityReassignment();
      }
    });

    if (this.crewState.needsActivityReassignment) {
      this.reassignActivity();
    }

    this.crewState.activitiesInProcess.forEach((activity) => {
      activity.processTick(this.settingsState.gameUpdateInterval);
    });
  };

  private tryAssignActivity = (activity: IActivity): void => {
    if (!activity.assignedPersons.every(p => !this.crewState.personActivityMap.has(p))) {
      return;
    }

    activity.assignedPersons.forEach(p => this.crewState.personActivityMap.set(p, activity));
    this.crewState.activitiesInProcess.push(activity);
  }

  private iterateActivitiesForAssignment = (activities: IActivity[]): void => {
    activities.forEach((activity) => {
      if (activity.attemptsLeft <= 0) {
        this.filteredActivityIds.add(activity.id);

        return;
      }

      this.tryAssignActivity(activity);
    });
  };

  private reassignActivity = () => {
    this.crewState.activitiesInProcess = [];
    this.crewState.personActivityMap.clear();
    this.filteredActivityIds.clear();

    this.iterateActivitiesForAssignment(this.sideJobState.sideJobSearches);
    this.iterateActivitiesForAssignment(this.sideJobState.sideJobs);

    this.sideJobState.filterActivities(this.filteredActivityIds);
  };
}
