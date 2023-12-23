import { makeAutoObservable } from 'mobx';
import {
  Quality, getRequirements, getBonusModifier, IPerson,
  getCredibilityGain, getExpGain, getMoneyGain, IActivityRequirements,
} from '@state/common';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import { ISideJob, ISideJobTemplate, ISideJobCreateArguments } from '../interfaces';
import { checkSidejobIsApplicable } from '../helpers';

export class SideJob implements ISideJob {
  readonly id;
  templateName = '';
  template: ISideJobTemplate;
  quality = Quality.Abysmal;
  assignedPersons: IPerson[] = [];
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
    this.assignedPersons = [createArguments.performingPerson];

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
      assignedPersons: this.assignedPersons,
      quality: this.quality,
      bonusModifiers: this.template.bonusModifiers,
    })
  }

  get credibility(): number {
    return getCredibilityGain(this.template.baseCredibility, this.quality, this.bonusModifier);
  }

  get exp(): number {
    const gameStateManager = getGameStateManagerInstance();

    return getExpGain(this.template.baseExp, this.quality, gameStateManager.globalState.level);
  }

  get money(): number {
    return getMoneyGain(this.template.baseMoney, this.quality, this.bonusModifier);
  }

  processTick = (tickTime: number): void => {
    const gameStateManager = getGameStateManagerInstance();

    gameStateManager.globalState.changeCredibility(this.credibility * tickTime);
    gameStateManager.globalState.changeMoney(this.money * tickTime);
  };

  checkIsApplicable = (): boolean => {
    return checkSidejobIsApplicable(this);
  }

  checkIsFinished = (): boolean => {
    return false;
  };

  processFinish = (): void => {};

  toggleRequirements = (): void => {
    this.sectionsOpened.requirements = !this.sectionsOpened.requirements;
  };

  toggleBonusModifiers = (): void => {
    this.sectionsOpened.bonusModifiers = !this.sectionsOpened.bonusModifiers;
  };
}
