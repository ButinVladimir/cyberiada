import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { IJob, IJobTemplate, IJobCreateArguments } from '../interfaces';
import {
  Attributes, Skills, PersonStats,
  ATTRIBUTE_FIELDS, SKILL_FIELDS, PERSON_STAT_FIELDS,
 } from '@state/common';
 import { JOB_QUALITY_BASE, JOB_TIME_AVAILABLE } from '../constants';

export class Job implements IJob {
  readonly id;
  templateName = '';

  requirements = {
    attributes: new Attributes(),
    skills: new Skills(),
    personStats: new PersonStats(),
  };

  moneyModifiers = {
    attributes: new Attributes(),
    skills: new Skills(),
    personStats: new PersonStats(),
  };

  money = 0;
  exp = 0;
  timeAvailable = 0;
  timeToDo = 0;

  constructor(id: string) {
    this.id = id;

    makeAutoObservable(this);
  }

  static createJob = (template: IJobTemplate, createArguments: IJobCreateArguments): Job => {
    const job = new Job(uuid());
    job.templateName = createArguments.templateName;

    const levelModifier = (JOB_QUALITY_BASE ** createArguments.quality) * createArguments.level;

    for (const field of ATTRIBUTE_FIELDS) {
      job.requirements.attributes[field] = (template.requirements.attributes[field] ?? 0) * levelModifier;
      job.moneyModifiers.attributes[field] = (template.moneyModifiers.attributes[field] ?? 0) * levelModifier;
    }

    for (const field of SKILL_FIELDS) {
      job.requirements.skills[field] = (template.requirements.skills[field] ?? 0) * levelModifier;
      job.moneyModifiers.skills[field] = (template.moneyModifiers.skills[field] ?? 0) * levelModifier;
    }

    for (const field of PERSON_STAT_FIELDS) {
      job.requirements.personStats[field] = (template.requirements.personStats[field] ?? 0) * levelModifier;
      job.moneyModifiers.personStats[field] = (template.moneyModifiers.personStats[field] ?? 0) * levelModifier;
    }

    job.exp = template.baseExp * levelModifier;
    job.money = template.baseMoney * levelModifier;

    job.timeToDo = template.timeToDo;
    job.timeAvailable = JOB_TIME_AVAILABLE;

    return job;
  };
}
