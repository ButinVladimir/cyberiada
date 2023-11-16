import { makeAutoObservable } from 'mobx';
import { IJobState } from '../interfaces';
import { Job, IJobCreateArguments, IJobTemplate } from '@/state/job';
import { MAX_JOBS } from '../constants';
import jobTemplates from '@templates/jobs.json';

export class JobState implements IJobState {
  jobs: Job[] = [];
  jobTemplates = new Map<string, IJobTemplate>();

  constructor() {
    makeAutoObservable(this);

    for (const [templateName, template] of Object.entries(jobTemplates as Record<string, IJobTemplate>)) {
      this.jobTemplates.set(templateName, template);
    }
  }

  generateJob = (createArguments: IJobCreateArguments): void => {
    if (this.jobs.length >= MAX_JOBS) {
      return;
    }

    if (!this.jobTemplates.has(createArguments.templateName)) {
      throw new Error(`Job template ${createArguments.templateName} is missing`);
    }

    const template = this.jobTemplates.get(createArguments.templateName)!;

    const job = Job.createJob(template, createArguments);

    this.jobs = [...this.jobs, job];
  };

  deleteJob = (id: string): void => {
    this.jobs = this.jobs.filter(j => j.id !== id);
  };
}
