import { msg, str } from '@lit/localize';
import cloneTemplates from '@configs/clone-templates.json';
import { type IStateUIConnector } from '@state/state-ui-connector';
import {
  Attribute,
  ClonesEvent,
  Skill,
  ATTRIBUTES,
  SKILLS,
  calculateGeometricProgressionSum,
  calculateTierLinear,
  calculateTierMultiplier,
  reverseGeometricProgressionSum,
  type IFormatter,
  binarySearchDecimal,
  PurchaseType,
  Feature,
} from '@shared/index';
import { type ICompanyState } from '@state/company-state/interfaces/company-state';
import { type IGlobalState } from '@state/global-state';
import { type IMessageLogState } from '@state/message-log-state';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { IClone, IMakeCloneParameters } from './interfaces';
import { CloneTemplateName } from './types';
import { ICloneTemplate } from './interfaces/clone-template';

const { lazyInject } = decorators;

export class Clone implements IClone {
  @lazyInject(TYPES.CompanyState)
  private _companyState!: ICompanyState;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.MessageLogState)
  private _messageLogState!: IMessageLogState;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.Formatter)
  private _formatter!: IFormatter;

  private _id: string;
  private _name: string;
  private _templateName: CloneTemplateName;
  private _template: ICloneTemplate;
  private _experience: number;
  private _level: number;
  private _tier: number;
  private _synchronization!: number;
  private _autoUpgradeEnabled: boolean;
  private _experienceMultiplier: number;

  private _attributes!: Map<Attribute, number>;
  private _skills!: Map<Skill, number>;

  constructor(parameters: IMakeCloneParameters) {
    this._id = parameters.id;
    this._name = parameters.name;
    this._templateName = parameters.templateName;
    this._template = cloneTemplates[parameters.templateName] as ICloneTemplate;
    this._experience = parameters.experience;
    this._level = parameters.level;
    this._tier = parameters.tier;
    this._autoUpgradeEnabled = parameters.autoUpgradeEnabled;
    this._experienceMultiplier = 1;

    this.initSynchronization();
    this.initExperience();
    this.initAttributes();
    this.initSkills();

    this.recalculateParameters();

    this._stateUiConnector.registerEventEmitter(this, [
      '_name',
      '_level',
      '_tier',
      '_autoUpgradeEnabled',
      '_attributes',
      '_skills',
      '_experienceMultiplier',
    ]);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    const oldName = this._name;
    this._name = value;

    this._messageLogState.postMessage(
      ClonesEvent.cloneRenamed,
      msg(str`Clone "${oldName}" has been renamed to "${value}"`),
    );
  }

  get templateName() {
    return this._templateName;
  }

  get experience() {
    return this._experience;
  }

  get level() {
    return this._level;
  }

  get tier() {
    return this._tier;
  }

  get synchonization() {
    return this._synchronization;
  }

  get autoUpgradeEnabled() {
    return this._autoUpgradeEnabled;
  }

  set autoUpgradeEnabled(value: boolean) {
    this._autoUpgradeEnabled = value;
  }

  get experienceMultiplier() {
    return this._experienceMultiplier;
  }

  increaseExperience(delta: number) {
    this._experience += delta;
  }

  purchaseLevelUpgrade(level: number): boolean {
    if (!this._globalState.unlockedFeatures.isFeatureUnlocked(Feature.companyManagement)) {
      return false;
    }

    if (!this._globalState.availableItems.cloneTemplates.isItemAvailable(this._templateName, this._tier, level)) {
      return false;
    }

    const cost = this._companyState.clones.getCloneCost(this._templateName, this._tier, level);

    return this._globalState.money.purchase(cost, PurchaseType.clones, () => {
      this.upgradeLevel(level);
    });
  }

  upgradeMaxLevel() {
    if (!this._globalState.unlockedFeatures.isFeatureUnlocked(Feature.companyManagement)) {
      return false;
    }

    const level = binarySearchDecimal(this._level, this._globalState.development.level, this.handleCheckLevelUpgrade);

    if (level <= this._level) {
      return false;
    }

    return this.purchaseLevelUpgrade(level);
  }

  getLevelRequirements(level: number): number {
    if (level < 0) {
      return 0;
    }

    return calculateGeometricProgressionSum(
      level,
      this._template.levelRequirements.multiplier,
      this._template.levelRequirements.base,
    );
  }

  getTotalAttributeValue(attribute: Attribute): number {
    return this._attributes.get(attribute)!;
  }

  getTotalSkillValue(skill: Skill): number {
    return this._skills.get(skill)!;
  }

  recalculate(): void {
    this.recalculateLevel();
  }

  serialize(): IMakeCloneParameters {
    return {
      id: this.id,
      name: this.name,
      templateName: this.templateName,
      experience: this.experience,
      level: this.level,
      tier: this.tier,
      autoUpgradeEnabled: this.autoUpgradeEnabled,
    };
  }

  removeAllEventListeners() {
    this._stateUiConnector.unregisterEventEmitter(this);
  }

  private initSynchronization() {
    this._synchronization = Math.ceil(
      this._template.synchronization.multiplier *
        calculateTierMultiplier(this._tier, this._template.synchronization.baseTier),
    );
  }

  private initExperience() {
    this._experience = Math.max(this._experience, this.getLevelRequirements(this._level - 1));
  }

  private initAttributes() {
    this._attributes = new Map<Attribute, number>();

    ATTRIBUTES.forEach((attribute) => this._attributes.set(attribute, 0));
  }

  private initSkills() {
    this._skills = new Map<Skill, number>();

    SKILLS.forEach((skill) => this._skills.set(skill, 0));
  }

  private recalculateLevel(): void {
    const newLevel = this.calculateLevelFromExperience();

    if (newLevel > this._level) {
      this._level = newLevel;
      const formattedLevel = this._formatter.formatLevel(this._level);
      this._messageLogState.postMessage(
        ClonesEvent.cloneLevelReached,
        msg(str`Clone "${this._name}" has reached level ${formattedLevel}`),
      );

      this.recalculateParameters();
    }
  }

  private recalculateParameters(): void {
    this.recalculateAttributes();
    this.recalculateSkills();
    this.recalculateExperienceMultiplier();
  }

  private recalculateAttributes(): void {
    ATTRIBUTES.forEach((attribute) => {
      const templateValues = this._template.attributes[attribute];

      const baseValue = calculateTierLinear(this._level, this._tier, templateValues);
      const totalValue = Math.floor(baseValue);

      this._attributes.set(attribute, totalValue);
    });
  }

  private recalculateSkills(): void {
    SKILLS.forEach((skill) => {
      const templateValues = this._template.skills[skill];

      const baseValue = calculateTierLinear(this._level, this._tier, templateValues);
      const totalValue = Math.floor(baseValue);

      this._skills.set(skill, totalValue);
    });
  }

  private recalculateExperienceMultiplier(): void {
    this._experienceMultiplier = calculateTierLinear(
      this.getTotalAttributeValue(Attribute.intellect),
      this._tier,
      this._template.experienceMultiplier,
    );
  }

  private handleCheckLevelUpgrade = (level: number): boolean => {
    if (!this._globalState.availableItems.cloneTemplates.isItemAvailable(this._templateName, this._tier, level)) {
      return false;
    }

    const cost = this._companyState.clones.getCloneCost(this._templateName, this._tier, level);

    return cost <= this._globalState.money.money;
  };

  private upgradeLevel(level: number) {
    this._level = level;
    this._experience = this.getLevelRequirements(level - 1);
    this._companyState.requestReassignment();

    const formattedLevel = this._formatter.formatLevel(level);
    this._messageLogState.postMessage(
      ClonesEvent.cloneLevelUpgraded,
      msg(str`Clone "${this._name}" level has been upgraded to ${formattedLevel}`),
    );

    this.recalculateParameters();
  }

  private calculateLevelFromExperience(): number {
    const { base, multiplier } = this._template.levelRequirements;

    return Math.min(
      reverseGeometricProgressionSum(this._experience, multiplier, base),
      this._globalState.development.level,
    );
  }
}
