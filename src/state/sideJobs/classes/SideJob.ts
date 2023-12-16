import { makeAutoObservable } from 'mobx';
import {
  Quality, getRequirements, getBonusModifier, IPerson,
  getCredibilityGain, getExpGain, getMoneyGain,
} from '@state/common';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import { ISideJob, ISideJobTemplate, IJobCreateArguments } from '../interfaces';
import { checkSidejobIsApplicable } from '../helpers';

export class SideJob implements ISideJob {
  readonly id;
  templateName = '';
  template: ISideJobTemplate;
  level = 0;
  quality = Quality.Abysmal;
  assignedPersons: IPerson[] = [];

  constructor(id: string, template: ISideJobTemplate, createArguments: IJobCreateArguments, performingPerson: IPerson) {
    this.id = id;

    this.templateName = createArguments.templateName;
    this.template = template;
    this.level = createArguments.level;
    this.quality = createArguments.quality;
    this.assignedPersons = [performingPerson];

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
    const gameStateManager = getGameStateManagerInstance();

    gameStateManager.globalState.changeCredibility(this.credibility * tickTime);
    gameStateManager.globalState.changeMoney(this.money * tickTime);
  };

  checkIsApplicable = (): boolean => {
    return checkSidejobIsApplicable(this.assignedPersons, this.requirements);
  }

  checkIsFinished = (): boolean => {
    return false;
  };

  processFinish = (): void => {};
}
