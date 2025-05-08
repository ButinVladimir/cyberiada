import { msg, str } from '@lit/localize';
import cloneTemplates from '@configs/clone-templates.json';
import { Attribute, ClonesEvent, Skill } from '@shared/types';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { ATTRIBUTES, SKILLS } from '@shared/constants';
import {
  calculateGeometricProgressionSum,
  calculateQualityLinear,
  calculateQualityMultiplier,
  reverseGeometricProgressionSum,
} from '@shared/helpers';
import { ICompanyState } from '@state/company-state/interfaces/company-state';
import { IGlobalState } from '@state/global-state/interfaces/global-state';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { IFormatter } from '@shared/interfaces/formatter';
import { IClone, IBaseCloneParameters, IMakeCloneParameters, ICloneParameterValues } from './interfaces';
import { CloneTemplateName } from './types';
import { ICloneTemplate } from './interfaces/clone-template';

export class Clone implements IClone {
  private UI_EVENTS = {
    CLONE_CHANGED: Symbol('CLONE_CHANGED'),
  };

  private _companyState: ICompanyState;
  private _globalState: IGlobalState;
  private _messageLogState: IMessageLogState;
  private _stateUiConnector: IStateUIConnector;
  private _formatter: IFormatter;

  private _id: string;
  private _name: string;
  private _templateName: CloneTemplateName;
  private _template: ICloneTemplate;
  private _experience: number;
  private _level: number;
  private _quality: number;
  private _synchronization!: number;
  private _autoUpgradeEnabled: boolean;

  private _attributes!: Map<Attribute, ICloneParameterValues>;
  private _skills!: Map<Skill, ICloneParameterValues>;

  constructor(parameters: IBaseCloneParameters) {
    this._companyState = parameters.companyState;
    this._globalState = parameters.globalState;
    this._messageLogState = parameters.messageLogState;
    this._stateUiConnector = parameters.stateUiConnector;
    this._formatter = parameters.formatter;

    this._id = parameters.id;
    this._name = parameters.name;
    this._templateName = parameters.templateName;
    this._template = cloneTemplates[parameters.templateName] as ICloneTemplate;
    this._experience = parameters.experience;
    this._level = parameters.level;
    this._quality = parameters.quality;
    this._autoUpgradeEnabled = parameters.autoUpgradeEnabled;

    this._stateUiConnector.registerEvents(this.UI_EVENTS);

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
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.CLONE_CHANGED);

    return this._name;
  }

  set name(value: string) {
    const oldName = this._name;
    this._name = value;

    this._messageLogState.postMessage(
      ClonesEvent.cloneRenamed,
      msg(str`Clone "${oldName}" has been renamed to "${value}"`),
    );

    this._stateUiConnector.enqueueEvent(this.UI_EVENTS.CLONE_CHANGED);
  }

  get templateName() {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.CLONE_CHANGED);

    return this._templateName;
  }

  get experience() {
    return this._experience;
  }

  get level() {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.CLONE_CHANGED);

    return this._level;
  }

  get quality() {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.CLONE_CHANGED);

    return this._quality;
  }

  get synchonization() {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.CLONE_CHANGED);

    return this._synchronization;
  }

  get autoUpgradeEnabled() {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.CLONE_CHANGED);

    return this._autoUpgradeEnabled;
  }

  set autoUpgradeEnabled(value: boolean) {
    this._autoUpgradeEnabled = value;

    this._stateUiConnector.enqueueEvent(this.UI_EVENTS.CLONE_CHANGED);
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
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.CLONE_CHANGED);

    return this._attributes.get(attribute)!.baseValue;
  }

  getTotalAttributeValue(attribute: Attribute): number {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.CLONE_CHANGED);

    return this._attributes.get(attribute)!.totalValue;
  }

  getBaseSkillValue(skill: Skill): number {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.CLONE_CHANGED);

    return this._skills.get(skill)!.baseValue;
  }

  getTotalSkillValue(skill: Skill): number {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.CLONE_CHANGED);

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
      quality: this.quality,
      autoUpgradeEnabled: this.autoUpgradeEnabled,
    };
  }

  removeAllEventListeners() {
    this._stateUiConnector.unregisterEvents(this.UI_EVENTS);
  }

  private initSynchronization() {
    this._synchronization = Math.ceil(
      this._template.synchronization.multiplier *
        calculateQualityMultiplier(this._quality, this._template.synchronization.baseQuality),
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

    this._stateUiConnector.enqueueEvent(this.UI_EVENTS.CLONE_CHANGED);
  }

  private recalculateAttributes(): void {
    ATTRIBUTES.forEach((attribute) => {
      const currentValues = this._attributes.get(attribute)!;
      const templateValues = this._template.attributes[attribute];

      currentValues.baseValue = calculateQualityLinear(this._level, this._quality, templateValues);

      currentValues.totalValue = currentValues.baseValue;
    });
  }

  private recalculateSkills(): void {
    SKILLS.forEach((skill) => {
      const currentValues = this._skills.get(skill)!;
      const templateValues = this._template.skills[skill];

      currentValues.baseValue = calculateQualityLinear(this._level, this._quality, templateValues);

      currentValues.totalValue = currentValues.baseValue;
    });
  }
}
