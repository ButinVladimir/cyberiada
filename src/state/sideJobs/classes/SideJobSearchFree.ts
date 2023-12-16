import { makeAutoObservable } from 'mobx';
import {
  Quality, getRequirements, getBonusModifier, IPerson,
  getCredibilityGain, getExpGain, getMoneyGain,
} from '@state/common';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import { ISideJobSearchFree, ISideJobTemplate, IJobCreateArguments } from '../interfaces';
import { checkSidejobIsApplicable, getSearchCompleteTime } from '../helpers';

export class SideJobSearchFree implements ISideJobSearchFree {
  readonly id;
  templateName = '';
  template: ISideJobTemplate;
  level = 0;
  quality = Quality.Abysmal;
  assignedPersons: IPerson[] = [];
  isComplete = false;
  performingPersonId = '';
  timeLeft = 0;

  constructor(id: string, template: ISideJobTemplate, createArguments: IJobCreateArguments, searchPerson: IPerson) {
    this.id = id;

    this.templateName = createArguments.templateName;
    this.template = template;
    this.level = createArguments.level;
    this.quality = createArguments.quality;
    this.assignedPersons = [searchPerson];
    this.performingPersonId = createArguments.performingPersonId;
    this.timeLeft = this.timeToFinish;

    makeAutoObservable(this);
  }

  get requirements() {
    return getRequirements({
      level: this.level,
      quality: this.quality,
      requirements: this.template.requirements,
    });
  }

  get bonusModifier() {
    return getBonusModifier({
      assignedPersons: this.assignedPersons,
      quality: this.quality,
      bonusModifiers: this.template.bonusModifiers,
    })
  }

  get credibility() {
    return getCredibilityGain(this.template.baseCredibility, this.quality, this.bonusModifier);
  }

  get exp() {
    return getExpGain(this.template.baseExp, this.quality, this.level);
  }

  get money() {
    return getMoneyGain(this.template.baseMoney, this.quality, this.bonusModifier);
  }

  get timeToFinish() {
    return getSearchCompleteTime(this.assignedPersons[0], this.template, this.quality);
  }

  processTick = (tickTime: number): void => {
    if (this.timeLeft > 0) {
      this.timeLeft -= tickTime;
    }

    if (this.timeLeft <= 0 && !this.isComplete) {
      const gameStateManager = getGameStateManagerInstance();

      const sideJobCreated = gameStateManager.sideJobState.startSideJob({
        level: this.level,
        quality: this.quality,
        templateName: this.templateName,
        performingPersonId: this.performingPersonId,
        searchPersonId: this.assignedPersons[0].id,
        isPaid: false,
      });

      if (sideJobCreated) {
        this.isComplete = true;
      }
    }
  };

  checkIsApplicable = (): boolean => {
    return checkSidejobIsApplicable(this.assignedPersons, this.requirements);
  }

  checkIsFinished = (): boolean => {
    return this.isComplete;
  };

  processFinish = (): void => {};
}
