import { makeAutoObservable } from 'mobx';
import {
  Quality, getRequirements, getBonusModifier, IPerson,
  getCredibilityGain, getExpGain, getMoneyGain, IActivityRequirements,
} from '@state/common';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import { MAX_SIDE_JOBS } from '@state/gameState/constants';
import { ISideJobSearch, ISideJobTemplate, ISideJobCreateArguments } from '../interfaces';
import { getSearchCompleteTime, getSearchCost } from '../helpers';

export class SideJobSearch implements ISideJobSearch {
  readonly id;
  templateName = '';
  template: ISideJobTemplate;
  level = 0;
  quality = Quality.Abysmal;
  assignedPersons: IPerson[] = [];
  performingPersons: IPerson[] = [];
  completion = 0;
  attemptsLeft = 1;

  sectionsOpened = {
    requirements: false,
    bonusModifiers: false,
  };

  constructor(id: string, template: ISideJobTemplate, createArguments: ISideJobCreateArguments) {
    this.id = id;

    this.templateName = createArguments.templateName;
    this.template = template;
    this.quality = createArguments.quality;
    this.assignedPersons = [createArguments.searchPerson];
    this.performingPersons = [createArguments.performingPerson];
    this.completion = 0;

    makeAutoObservable(this);
  }

  get requirements(): IActivityRequirements {
    const gameStateManager = getGameStateManagerInstance();

    return getRequirements({
      level: gameStateManager.globalState.level,
      quality: this.quality,
      requirements: this.template.requirements,
    });
  }

  get bonusModifier(): number {
    return getBonusModifier({
      assignedPersons: this.performingPersons,
      quality: this.quality,
      bonusModifiers: this.template.bonusModifiers,
    })
  }

  get credibility(): number {
    return getCredibilityGain(this.template.baseCredibility, this.quality, this.bonusModifier);
  }

  get exp(): number {
    return getExpGain(this.template.baseExp, this.quality, this.level);
  }

  get money(): number {
    return getMoneyGain(this.template.baseMoney, this.quality, this.bonusModifier);
  }

  get timeToFinish(): number {
    return getSearchCompleteTime(this);
  }

  get cost(): number {
    return getSearchCost(this);
  }

  get canBePaid(): boolean {
    if (this.attemptsLeft <= 0) {
      return false;
    }

    if (!this.checkIsApplicable()) {
      return false;
    }

    const gameStateManager = getGameStateManagerInstance();

    return gameStateManager.globalState.money >= this.cost;
  }

  processTick = (tickTime: number): void => {
    if (this.completion < 1) {
      this.completion += tickTime / this.timeToFinish;
    }
  };

  checkIsApplicable = (): boolean => {
    const gameStateManager = getGameStateManagerInstance();

    return gameStateManager.sideJobState.sideJobs.length < MAX_SIDE_JOBS;
  }

  checkIsFinished = (): boolean => {
    if (!this.checkIsApplicable()) {
      return false;
    }

    return this.attemptsLeft > 0 && this.completion >= 1;
  };

  processFinish = (): void => {
    const gameStateManager = getGameStateManagerInstance();

    gameStateManager.sideJobState.startSideJob({
      quality: this.quality,
      templateName: this.templateName,
      performingPerson: this.performingPersons[0],
      searchPerson: this.assignedPersons[0],
    });

    this.attemptsLeft = 0;
  };

  toggleRequirements = (): void => {
    this.sectionsOpened.requirements = !this.sectionsOpened.requirements;
  };

  toggleBonusModifiers = (): void => {
    this.sectionsOpened.bonusModifiers = !this.sectionsOpened.bonusModifiers;
  };

  buyOut = (): void => {
    if (!this.canBePaid) {
      return;
    }

    const gameStateManager = getGameStateManagerInstance();

    if (this.attemptsLeft > 0) {
      gameStateManager.globalState.changeMoney(-this.cost);
      this.processFinish();
      gameStateManager.crewState.requestActivityReassignment();
    }
  };
}
