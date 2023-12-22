import {
  ISideJob, ISideJobSearch, ISideJobTemplate, ISideJobCreateArguments,
} from '@/state/sideJobs';

export interface ISideJobState {
  sideJobs: ISideJob[];
  sideJobSearches: ISideJobSearch[];
  sideJobTemplates: Map<string, ISideJobTemplate>;

  startSideJobSearch(createArguments: ISideJobCreateArguments): boolean;
  deleteSideJobSearch(sideJobSearch: ISideJobSearch): void;
  startSideJob(createArguments: ISideJobCreateArguments): boolean;
  deleteSideJob(sideJob: ISideJob): void;
  filterActivities(filteredActivityIds: Set<string>): void;
}
