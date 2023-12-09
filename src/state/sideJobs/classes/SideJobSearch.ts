import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import {
  Quality, getRequirements, getBonusModifier, IPerson,
  getCredibilityGain, getExpGain, getMoneyGain,
} from '@state/common';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import { ISideJobSearch, ISideJobTemplate, IJobCreateArguments } from '../interfaces';
import { checkSidejobIsApplicable, getSearchCompleteTime } from '../helpers';

export class SideJobSearch implements ISideJobSearch {
  readonly id;
  templateName = '';
  template: ISideJobTemplate;
  level = 0;
  quality = Quality.Abysmal;
  assignedPersons: IPerson[] = [];
  isActive = false;
  attemptsLeft = 1;
  performingPersonId = '';
  timeLeft = 0;

  constructor(id: string, template: ISideJobTemplate, createArguments: IJobCreateArguments, searchPerson: IPerson) {
    this.id = id;

    this.templateName = createArguments.templateName;
    this.template = template;
    this.level = createArguments.level;
    this.quality = createArguments.quality;
    this.attemptsLeft = createArguments.attempts;
    this.assignedPersons = [searchPerson];
    this.performingPersonId = createArguments.performingPersonId;
    this.timeLeft = getSearchCompleteTime(this.quality);

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

  processTick = (tickTime: number): void => {
    if (this.timeLeft > 0) {
      this.timeLeft -= tickTime;
    }

    if (this.timeLeft <= 0) {
      const timeToComplete = getSearchCompleteTime(this.quality);
      const gameStateManager = getGameStateManagerInstance();

      while (this.timeLeft <= 0 && this.attemptsLeft > 0) {
        const sideJobCreated = gameStateManager.sideJobState.startSideJob({
          attempts: 0,
          level: this.level,
          quality: this.quality,
          templateName: this.templateName,
          performingPersonId: this.performingPersonId,
          searchPersonId: this.assignedPersons[0].id,
        });

        if (sideJobCreated) {
          this.timeLeft += timeToComplete;
          this.attemptsLeft--;
        } else {
          break;
        }
      }
    }
  };

  checkIsFinished = (): boolean => {
    if (this.attemptsLeft <= 0) {
      return true;
    }

    return !checkSidejobIsApplicable(this.assignedPersons, this.requirements);
  };

  processFinish = (): void => {};

  static createSideJobSearch = (template: ISideJobTemplate, createArguments: IJobCreateArguments): SideJobSearch => {
    const gameStateManager = getGameStateManagerInstance();
    const searchPerson = gameStateManager.crewState.getCrewMember(createArguments.searchPersonId);
    const job = new SideJobSearch(uuid(), template, createArguments, searchPerson);

    return job;
  };
}
