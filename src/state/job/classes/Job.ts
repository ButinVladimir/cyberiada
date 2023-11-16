import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { IJob, IJobTemplate, IJobCreateArguments } from '../interfaces';
import {
  Attributes, Skills, PersonStats, Quality,
  ATTRIBUTE_FIELDS, SKILL_FIELDS, PERSON_STAT_FIELDS,
  QUALITY_POWERS,
 } from '@state/common';
import { JOB_QUALITY_BASE, JOB_TIME_AVAILABLE } from '../constants';

function applyModifier(value: number | undefined, modifier: number): number {
  return Math.floor((value ?? 0) * modifier);
}

export class Job implements IJob {
  readonly id;
  templateName = '';
  template: IJobTemplate | null = null;
  level = 0;
  quality = Quality.Average;

  timeAvailable = 0;
  timeToDo = 0;

  sectionsOpened = {
    requirements: false,
    bonusModifiers: false,
  };

  constructor(id: string) {
    this.id = id;

    makeAutoObservable(this);
  }

  private getLevelModifier = (): number => (JOB_QUALITY_BASE ** QUALITY_POWERS[this.quality]) * this.level;

  get requirements() {
    const result = {
      attributes: new Attributes(),
      skills: new Skills(),
      personStats: new PersonStats(),
    };

    const levelModifier = this.getLevelModifier();

    for (const field of ATTRIBUTE_FIELDS) {
      result.attributes[field] = applyModifier(this.template?.requirements.attributes[field], levelModifier);
    }

    for (const field of SKILL_FIELDS) {
      result.skills[field] = applyModifier(this.template?.requirements.skills[field], levelModifier);
    }

    for (const field of PERSON_STAT_FIELDS) {
      result.personStats[field] = applyModifier(this.template?.requirements.personStats[field], levelModifier);
    }

    return result;
  }

  get bonusModifiers() {
    const result = {
      attributes: new Attributes(),
      skills: new Skills(),
      personStats: new PersonStats(),
    };

    const levelModifier = this.getLevelModifier();

    for (const field of ATTRIBUTE_FIELDS) {
      result.attributes[field] = applyModifier(this.template?.bonusModifiers.attributes[field], levelModifier);
    }

    for (const field of SKILL_FIELDS) {
      result.skills[field] = applyModifier(this.template?.bonusModifiers.skills[field], levelModifier);
    }

    for (const field of PERSON_STAT_FIELDS) {
      result.personStats[field] = applyModifier(this.template?.bonusModifiers.personStats[field], levelModifier);
    }

    return result;
  }

  get exp() {
    return (this.template?.baseExp ?? 0) * this.getLevelModifier();
  }

  get money() {
    return (this.template?.baseMoney ?? 0) * this.getLevelModifier();
  }

  static createJob = (template: IJobTemplate, createArguments: IJobCreateArguments): Job => {
    const job = new Job(uuid());
    job.templateName = createArguments.templateName;
    job.template = template;
    job.level = createArguments.level;
    job.quality = createArguments.quality;

    job.timeToDo = template.timeToDo;
    job.timeAvailable = JOB_TIME_AVAILABLE;

    return job;
  };

  toggleRequirements = () => {
    this.sectionsOpened.requirements = !this.sectionsOpened.requirements;
  };

  toggleBonusModifiers = () => {
    this.sectionsOpened.bonusModifiers = !this.sectionsOpened.bonusModifiers;    
  };
}
