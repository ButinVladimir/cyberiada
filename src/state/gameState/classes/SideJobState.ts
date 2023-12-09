import { makeAutoObservable } from 'mobx';
import { ISideJobState } from '../interfaces';
import { SideJob, SideJobSearch, IJobCreateArguments, ISideJobTemplate } from '@/state/sideJobs';
import { MAX_SIDE_JOBS, MAX_SIDE_JOBS_SEARCHES } from '../constants';
import jobTemplates from '@templates/side-jobs.json';

export class SideJobState implements ISideJobState {
  sideJobs: SideJob[] = [];
  sideJobSearches: SideJobSearch[] = [];
  sideJobTemplates = new Map<string, ISideJobTemplate>();

  constructor() {
    makeAutoObservable(this);

    for (const [templateName, template] of Object.entries(jobTemplates.sideJobs as Record<string, ISideJobTemplate>)) {
      this.sideJobTemplates.set(templateName, template);
    }
  }

  startSideJobSearch = (createArguments: IJobCreateArguments): boolean => {
    if (this.sideJobSearches.length >= MAX_SIDE_JOBS_SEARCHES) {
      return false;
    }

    if (!this.sideJobTemplates.has(createArguments.templateName)) {
      throw new Error(`Side job template ${createArguments.templateName} is missing`);
    }

    const template = this.sideJobTemplates.get(createArguments.templateName)!;
    const sideJobSearch = SideJobSearch.createSideJobSearch(template, createArguments);

    this.sideJobSearches.push(sideJobSearch);

    return true;
  };

  deleteSideJobSearch = (id: string): void => {
    const sideJobSearchIndex = this.sideJobs.findIndex(j => j.id === id);

    if (sideJobSearchIndex !== -1) {
      this.sideJobs.splice(sideJobSearchIndex, 1);
    }
  };

  startSideJob = (createArguments: IJobCreateArguments): boolean => {
    if (this.sideJobs.length >= MAX_SIDE_JOBS) {
      return false;
    }

    if (!this.sideJobTemplates.has(createArguments.templateName)) {
      throw new Error(`Side job template ${createArguments.templateName} is missing`);
    }

    const template = this.sideJobTemplates.get(createArguments.templateName)!;
    const sideJob = SideJob.createSideJob(template, createArguments);

    this.sideJobs.push(sideJob);

    return true;
  };

  deleteSideJob = (id: string): void => {
    const sideJobIndex = this.sideJobs.findIndex(j => j.id === id);

    if (sideJobIndex !== -1) {
      this.sideJobs.splice(sideJobIndex, 1);
    }
  };
}
