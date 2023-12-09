import { ISideJob, ISideJobTemplate, IJobCreateArguments } from '@/state/sideJobs';

export interface ISideJobState {
  sideJobs: ISideJob[];
  sideJobTemplates: Map<string, ISideJobTemplate>;

  createSideJobSearch(createArguments: IJobCreateArguments): boolean;
  deleteSideJobSearch(id: string): void;
  startSideJob(createArguments: IJobCreateArguments): boolean;
  deleteSideJob(id: string): void;
}
