import {
  ISideJob, ISideJobSearch, ISideJobTemplate, IJobCreateArguments,
} from '@/state/sideJobs';

export interface ISideJobState {
  sideJobs: ISideJob[];
  sideJobSearches: ISideJobSearch[];
  sideJobTemplates: Map<string, ISideJobTemplate>;

  startSideJobSearch(createArguments: IJobCreateArguments): boolean;
  deleteSideJobSearch(sideJobSearch: ISideJobSearch): void;
  startSideJob(createArguments: IJobCreateArguments): boolean;
  deleteSideJob(sideJob: ISideJob): void;
  filterActivities(filteredActivityIds: Set<string>): void;
}
