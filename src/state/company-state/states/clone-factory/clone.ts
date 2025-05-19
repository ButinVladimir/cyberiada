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
} from '@shared/index';
import { type ICompanyState } from '@state/company-state/interfaces/company-state';
import { type IGlobalState } from '@state/global-state';
import { type IMessageLogState } from '@state/message-log-state';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { IClone, IMakeCloneParameters, ICloneParameterValues } from './interfaces';
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

  private _attributes!: Map<Attribute, ICloneParameterValues>;
  private _skills!: Map<Skill, ICloneParameterValues>;

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

    this._stateUiConnector.registerEventEmitter(this, [
      '_name',
      '_level',
      '_tier',
      '_autoUpgradeEnabled',
      '_attributes',
      '_skills',
      '_experienceMultiplier',
    ]);

    this.initSynchronization();
    this.initExperience();
    this.initAttributes();
    this.initSkills();

    this.recalculateParameters();
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

  earnExperience(delta: number) {
    this.increaseExperience(delta);
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

  getBaseAttributeValue(attribute: Attribute): number {
    return this._attributes.get(attribute)!.baseValue;
  }

  getTotalAttributeValue(attribute: Attribute): number {
    return this._attributes.get(attribute)!.totalValue;
  }

  getBaseSkillValue(skill: Skill): number {
    return this._skills.get(skill)!.baseValue;
  }

  getTotalSkillValue(skill: Skill): number {
    return this._skills.get(skill)!.totalValue;
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
    this._attributes = new Map<Attribute, ICloneParameterValues>();

    ATTRIBUTES.forEach((attribute) =>
      this._attributes.set(attribute, {
        baseValue: 0,
        totalValue: 0,
      }),
    );

    this._skills = new Map<Skill, ICloneParameterValues>();
  }

  private initSkills() {
    this._skills = new Map<Skill, ICloneParameterValues>();

    SKILLS.forEach((skill) =>
      this._skills.set(skill, {
        baseValue: 0,
        totalValue: 0,
      }),
    );
  }

  private recalculateLevel(): void {
    const { base, multiplier } = this._template.levelRequirements;

    const newLevel = Math.min(
      reverseGeometricProgressionSum(this._experience, multiplier, base),
      this._globalState.development.level,
    );

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

      this._attributes.set(attribute, {
        baseValue,
        totalValue,
      });
    });
  }

  private recalculateSkills(): void {
    SKILLS.forEach((skill) => {
      const templateValues = this._template.skills[skill];

      const baseValue = calculateTierLinear(this._level, this._tier, templateValues);
      const totalValue = Math.floor(baseValue);

      this._skills.set(skill, {
        baseValue,
        totalValue,
      });
    });
  }

  private recalculateExperienceMultiplier(): void {
    this._experienceMultiplier = calculateTierLinear(
      this.getTotalAttributeValue(Attribute.intellect),
      this._tier,
      this._template.experienceMultiplier,
    );
  }
}
