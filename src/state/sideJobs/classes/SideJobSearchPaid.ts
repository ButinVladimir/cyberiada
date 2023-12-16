import { makeAutoObservable } from 'mobx';
import {
  Quality, getRequirements, getBonusModifier, IPerson,
  getCredibilityGain, getExpGain, getMoneyGain,
} from '@state/common';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import { ISideJobSearchPaid, ISideJobTemplate, IJobCreateArguments } from '../interfaces';
import { checkSidejobIsApplicable, getSearchCost } from '../helpers';

export class SideJobSearchPaid implements ISideJobSearchPaid {
  readonly id;
  templateName = '';
  template: ISideJobTemplate;
  level = 0;
  quality = Quality.Abysmal;
  assignedPersons: IPerson[] = [];
  isComplete = false;
  performingPersonId = '';

  constructor(id: string, template: ISideJobTemplate, createArguments: IJobCreateArguments, searchPerson: IPerson) {
    this.id = id;

    this.templateName = createArguments.templateName;
    this.template = template;
    this.level = createArguments.level;
    this.quality = createArguments.quality;
    this.assignedPersons = [searchPerson];
    this.performingPersonId = createArguments.performingPersonId;

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

  get cost() {
    return getSearchCost(this.assignedPersons[0], this.template, this.quality);
  }

  processTick = (): void => {
    const gameStateManager = getGameStateManagerInstance();

    if (!this.isComplete && gameStateManager.globalState.money >= this.cost) {
      const sideJobCreated = gameStateManager.sideJobState.startSideJob({
        level: this.level,
        quality: this.quality,
        templateName: this.templateName,
        performingPersonId: this.performingPersonId,
        searchPersonId: this.assignedPersons[0].id,
        isPaid: true,
      });

      if (sideJobCreated) {
        this.isComplete = true;
        gameStateManager.globalState.changeMoney(-this.cost);
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
