import cloneTemplates from '@configs/clone-templates.json';
import { Attribute, Skill } from '@shared/types';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { EventBatcher } from '@shared/event-batcher';
import { ATTRIBUTES, SKILLS } from '@shared/constants';
import { calculatePowWithQuality, reverseGeometricProgressionSum } from '@shared/helpers';
import { IClone, IBaseCloneParameters, IMakeCloneParameters, ICloneParameterValues } from './interfaces';
import { CloneTemplateName } from './types';
import { ICloneTemplate } from './interfaces/clone-template';

export class Clone implements IClone {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;

  private _name: string;
  private _templateName: CloneTemplateName;
  private _template: ICloneTemplate;
  private _experience: number;
  private _level: number;
  private _quality: number;
  private _control!: number;
  private _autoUpgradeEnabled: boolean;

  private _attributes!: Map<Attribute, ICloneParameterValues>;
  private _skills!: Map<Skill, ICloneParameterValues>;

  private _levelRecalculationRequested: boolean;
  private _parametersRecalculationRequested: boolean;

  constructor(parameters: IBaseCloneParameters) {
    this._stateUiConnector = parameters.stateUiConnector;

    this._name = parameters.name;
    this._templateName = parameters.templateName;
    this._template = cloneTemplates[parameters.templateName] as ICloneTemplate;
    this._experience = parameters.experience;
    this._level = parameters.level;
    this._quality = parameters.quality;
    this._autoUpgradeEnabled = parameters.autoUpgradeEnabled;

    this._levelRecalculationRequested = true;
    this._parametersRecalculationRequested = true;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);

    this.initControl();
    this.initExperience();
    this.initAttributes();
    this.initSkills();

    this.recalculate();
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
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

  get quality() {
    return this._quality;
  }

  get control() {
    return this._control;
  }

  get autoUpgradeEnabled() {
    return this._autoUpgradeEnabled;
  }

  set autoUpgradeEnabled(value: boolean) {
    this._autoUpgradeEnabled = value;
  }

  get cost() {
    return calculatePowWithQuality(this.level - 1, this.quality, this._template.cost);
  }

  increaseExperience(delta: number) {
    this._experience += delta;
    this.requestLevelRecalculation();
  }

  getLevelRequirements(level: number): number {
    if (level <= 0) {
      return 0;
    }

    const { base, baseMultiplier } = this._template.levelRequirements;

    return (baseMultiplier * (Math.pow(base, level) - 1)) / (base - 1);
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
    this.recalculateParameters();
  }

  removeEventListeners(): void {
    this._stateUiConnector.unregisterEventEmitter(this);
  }

  serialize(): IMakeCloneParameters {
    return {
      name: this.name,
      templateName: this.templateName,
      experience: this.experience,
      level: this.level,
      quality: this.quality,
      autoUpgradeEnabled: this.autoUpgradeEnabled,
    };
  }

  private initControl() {
    this._control =
      this._template.control.baseMultiplier * Math.pow(this._template.control.qualityMultiplier, this._quality);
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

  private requestLevelRecalculation(): void {
    this._levelRecalculationRequested = true;
  }

  private requestParametersRecalculation(): void {
    this._parametersRecalculationRequested = true;
  }

  private recalculateLevel(): void {
    if (!this._levelRecalculationRequested) {
      return;
    }

    this._levelRecalculationRequested = false;

    const newLevel = reverseGeometricProgressionSum(this._experience, this._template.levelRequirements);

    if (newLevel > this._level) {
      this._level = newLevel;
      this.requestParametersRecalculation();
    }
  }

  private recalculateParameters(): void {
    if (!this._parametersRecalculationRequested) {
      return;
    }

    this._parametersRecalculationRequested = false;

    ATTRIBUTES.forEach((attribute) => {
      const currentValues = this._attributes.get(attribute)!;
      const templateValues = this._template.attributes[attribute];

      currentValues.baseValue =
        (templateValues.base + (this._level - 1) * templateValues.perLevel) *
        Math.pow(templateValues.qualityMultiplier, this._quality);

      currentValues.totalValue = currentValues.baseValue;
    });

    SKILLS.forEach((skill) => {
      const currentValues = this._skills.get(skill)!;
      const templateValues = this._template.skills[skill];

      currentValues.baseValue =
        (templateValues.base + (this._level - 1) * templateValues.perLevel) *
        Math.pow(templateValues.qualityMultiplier, this._quality);

      currentValues.totalValue = currentValues.baseValue;
    });
  }
}
