import { IJob, IJobTemplate, IJobCreateArguments } from '@state/job';

export interface IJobState {
  jobs: IJob[];
  jobTemplates: Map<string, IJobTemplate>;

  generateJob(createArguments: IJobCreateArguments): void;
  deleteJob(id: string): void;
}
