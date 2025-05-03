import sidejobs from '@configs/sidejobs.json';
import {
  Attribute,
  Skill,
  IEventBatcher,
  EventBatcher,
  COMMON_UI_EVENTS,
  calculatePower,
  ATTRIBUTES,
  SKILLS,
  IncomeSource,
} from '@shared/index';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { type IGlobalState } from '@state/global-state';
import { IDistrictState } from '@state/city-state';
import { type IStateUIConnector } from '@state/state-ui-connector';
import { IClone } from '../clone-factory';
import { ISerializedSidejob, ISidejob, ISidejobArguments, ISidejobTemplate } from './interfaces';
import { SidejobName } from './types';

const { lazyInject } = decorators;

export class Sidejob implements ISidejob {
  readonly uiEventBatcher: IEventBatcher;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUIConnector!: IStateUIConnector;

  private _id: string;
  private _templateName: SidejobName;
  private _district: IDistrictState;
  private _isActive: boolean;
  private _assignedClone?: IClone;

  private _sidejobTemplate: ISidejobTemplate;

  constructor(args: ISidejobArguments) {
    this._id = args.id;
    this._templateName = args.sidejobName;
    this._district = args.district;
    this._assignedClone = args.assignedClone;
    this._isActive = false;

    this._sidejobTemplate = sidejobs[this._templateName] as ISidejobTemplate;

    this.uiEventBatcher = new EventBatcher();
    this._stateUIConnector.registerEventEmitter(this);
  }

  get id() {
    return this._id;
  }

  get sidejobName() {
    return this._templateName;
  }

  get district() {
    return this._district;
  }

  get isActive() {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  get assignedClone() {
    return this._assignedClone;
  }

  checkRequirements(): boolean {
    if (!this._assignedClone) {
      return false;
    }

    for (const attribute of ATTRIBUTES) {
      if (this._assignedClone.getTotalAttributeValue(attribute) < this.getAttributeRequirement(attribute)) {
        return false;
      }
    }

    for (const skill of SKILLS) {
      if (this._assignedClone.getTotalSkillValue(skill) < this.getSkillRequirement(skill)) {
        return false;
      }
    }

    return true;
  }

  getAttributeRequirement(attribute: Attribute): number {
    return calculatePower(this._globalState.threat.level, this._sidejobTemplate.requirements.attributes[attribute]);
  }

  getSkillRequirement(skill: Skill): number {
    return calculatePower(this._globalState.threat.level, this._sidejobTemplate.requirements.skills[skill]);
  }

  getAttributeModifier(attribute: Attribute): number {
    if (!this._assignedClone) {
      return 1;
    }

    const base = calculatePower(
      this._globalState.threat.level,
      this._sidejobTemplate.rewardModifiers.attributes[attribute],
    );

    return Math.pow(base, this._assignedClone.getTotalAttributeValue(attribute));
  }

  getSkillModifier(skill: Skill): number {
    if (!this._assignedClone) {
      return 1;
    }

    const base = calculatePower(this._globalState.threat.level, this._sidejobTemplate.rewardModifiers.skills[skill]);

    return Math.pow(base, this._assignedClone.getTotalSkillValue(skill));
  }

  perform(passedTime: number): void {
    if (!this._assignedClone) {
      return;
    }

    const cloneModifier = this.getCloneModifier();

    this._assignedClone.earnExperience(passedTime * cloneModifier * this.calculateExperienceModifier());
    this._globalState.money.increase(passedTime * cloneModifier * this.calculateMoneyModifier(), IncomeSource.sidejob);
    this._globalState.development.increase(
      passedTime * cloneModifier * this.calculateDevelopmentPointsModifier(),
      IncomeSource.sidejob,
    );
    this._district.parameters.tier.increasePoints(
      passedTime * cloneModifier * this.calculateDistrictTierPointsModifier(),
    );
    this._district.parameters.connectivity.increasePoints(
      passedTime * cloneModifier * this.calculateConnectivityModifier(),
    );
    this._district.parameters.multipliers.codeBase.increasePoints(
      passedTime * cloneModifier * this.calculateCodeBaseModifier(),
    );
    this._district.parameters.multipliers.computationalBase.increasePoints(
      passedTime * cloneModifier * this.calculateComputationalBaseModifier(),
    );
    this._district.parameters.multipliers.rewards.increasePoints(
      passedTime * cloneModifier * this.calculateRewardsModifier(),
    );
  }

  calculateExperienceDelta(passedTime: number): number {
    return passedTime * this.getCloneModifier() * this.calculateExperienceModifier();
  }

  calculateMoneyDelta(passedTime: number): number {
    return passedTime * this.getCloneModifier() * this.calculateMoneyModifier();
  }

  calculateDevelopmentPointsDelta(passedTime: number): number {
    return passedTime * this.getCloneModifier() * this.calculateDevelopmentPointsModifier();
  }

  calculateDistrictTierPointsDelta(passedTime: number): number {
    return passedTime * this.getCloneModifier() * this.calculateDistrictTierPointsModifier();
  }

  calculateConnectivityDelta(passedTime: number): number {
    return passedTime * this.getCloneModifier() * this.calculateConnectivityModifier();
  }

  calculateCodeBaseDelta(passedTime: number): number {
    return passedTime * this.getCloneModifier() * this.calculateCodeBaseModifier();
  }

  calculateComputationalBaseDelta(passedTime: number): number {
    return passedTime * this.getCloneModifier() * this.calculateComputationalBaseModifier();
  }

  calculateRewardsDelta(passedTime: number): number {
    return passedTime * this.getCloneModifier() * this.calculateRewardsModifier();
  }

  serialize(): ISerializedSidejob {
    return {
      id: this._id,
      sidejobName: this._templateName,
      districtIndex: this._district.index,
      assignedCloneId: this._assignedClone?.id,
    };
  }

  removeAllEventListeners(): void {
    this.uiEventBatcher.fireImmediateEvent(COMMON_UI_EVENTS.REMOVE_EVENT_LISTENERS_BY_EMITTER);
    this.uiEventBatcher.removeAllListeners();
    this._stateUIConnector.unregisterEventEmitter(this);
  }

  private getCloneModifier(): number {
    let modifier = 1;

    for (const attribute of ATTRIBUTES) {
      modifier *= this.getAttributeModifier(attribute);
    }

    for (const skill of SKILLS) {
      modifier *= this.getSkillModifier(skill);
    }

    return modifier;
  }

  private calculateExperienceModifier() {
    return (
      calculatePower(this._globalState.threat.level, this._sidejobTemplate.rewards.experience) *
      calculatePower(this._district.parameters.tier.tier, this._district.template.parameters.experience)
    );
  }

  private calculateMoneyModifier() {
    return (
      calculatePower(this._globalState.threat.level, this._sidejobTemplate.rewards.money) *
      calculatePower(this._district.parameters.tier.tier, this._district.template.parameters.money)
    );
  }

  private calculateDevelopmentPointsModifier() {
    return (
      calculatePower(this._globalState.threat.level, this._sidejobTemplate.rewards.developmentPoints) *
      calculatePower(this._district.parameters.tier.tier, this._district.template.parameters.developmentPoints)
    );
  }

  private calculateDistrictTierPointsModifier() {
    return (
      calculatePower(this._globalState.threat.level, this._sidejobTemplate.rewards.distictTierPoints) *
      calculatePower(
        this._district.parameters.tier.tier,
        this._district.template.parameters.districtTierPoints.pointsMultiplier,
      )
    );
  }

  private calculateConnectivityModifier() {
    return (
      calculatePower(this._globalState.threat.level, this._sidejobTemplate.rewards.connectivity) *
      calculatePower(
        this._district.parameters.tier.tier,
        this._district.template.parameters.connectivity.pointsMultiplier,
      )
    );
  }

  private calculateCodeBaseModifier() {
    return (
      calculatePower(this._globalState.threat.level, this._sidejobTemplate.rewards.codeBase) *
      calculatePower(this._district.parameters.tier.tier, this._district.template.parameters.codeBase.pointsMultiplier)
    );
  }

  private calculateComputationalBaseModifier() {
    return (
      calculatePower(this._globalState.threat.level, this._sidejobTemplate.rewards.computationalBase) *
      calculatePower(
        this._district.parameters.tier.tier,
        this._district.template.parameters.computationalBase.pointsMultiplier,
      )
    );
  }

  private calculateRewardsModifier() {
    return (
      calculatePower(this._globalState.threat.level, this._sidejobTemplate.rewards.rewards) *
      calculatePower(this._district.parameters.tier.tier, this._district.template.parameters.rewards.pointsMultiplier)
    );
  }
}
