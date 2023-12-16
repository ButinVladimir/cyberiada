import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import {
  SideJob, SideJobSearchFree, SideJobSearchPaid,
  IJobCreateArguments, ISideJobTemplate,
  ISideJob, ISideJobSearch,
} from '@/state/sideJobs';
import { getGameStateManagerInstance } from '@state/gameStateManager';
import { ISideJobState } from '../interfaces';
import { MAX_SIDE_JOBS, MAX_SIDE_JOBS_SEARCHES } from '../constants';
import jobTemplates from '@templates/side-jobs.json';
import { IPerson } from '@/state/common';

export class SideJobState implements ISideJobState {
  sideJobs: ISideJob[] = [];
  sideJobSearches: ISideJobSearch[] = [];
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
    const searchPerson = this.getPerson(createArguments.searchPersonId);
    const sideJobSearch = 
      createArguments.isPaid
      ? new SideJobSearchPaid(uuid(), template, createArguments, searchPerson)
      : new SideJobSearchFree(uuid(), template, createArguments, searchPerson);

    this.sideJobSearches = [...this.sideJobSearches, sideJobSearch];

    return true;
  };

  deleteSideJobSearch = (sideJobSearch: ISideJobSearch): void => {
    this.sideJobSearches = this.sideJobSearches.filter(s => s.id !== sideJobSearch.id);
  };

  startSideJob = (createArguments: IJobCreateArguments): boolean => {
    if (this.sideJobs.length >= MAX_SIDE_JOBS) {
      return false;
    }

    if (!this.sideJobTemplates.has(createArguments.templateName)) {
      throw new Error(`Side job template ${createArguments.templateName} is missing`);
    }

    const template = this.sideJobTemplates.get(createArguments.templateName)!;
    const performingPerson = this.getPerson(createArguments.performingPersonId);
    const sideJob = new SideJob(uuid(), template, createArguments, performingPerson);

    this.sideJobs = [...this.sideJobs, sideJob];

    return true;
  };

  deleteSideJob = (sideJob: ISideJob): void => {
    this.sideJobs = this.sideJobs.filter(s => s.id !== sideJob.id);
  };

  private getPerson = (personId: string): IPerson => {
    const gameStateManager = getGameStateManagerInstance();

    return gameStateManager.crewState.getCrewMember(personId);
  };

  filterActivities = (filteredActivityIds: Set<string>): void => {
    this.sideJobs = this.sideJobs.filter(j => !filteredActivityIds.has(j.id));
    this.sideJobSearches = this.sideJobSearches.filter(j => !filteredActivityIds.has(j.id));
  };
}
