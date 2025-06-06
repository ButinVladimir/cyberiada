import { ISerializeable } from '@shared/index';
import { SidejobName } from '../types';
import { ISidejobsSerializedState } from './sidejobs-serialized-state';
import { ISidejob } from './sidejob';
import { IMakeSidejobParameters } from './make-sidejob-parameters';
import { IAssignSidejobArguments } from './assign-sidejob-arguments';

export interface ISidejobsState extends ISerializeable<ISidejobsSerializedState> {
  getConnectivityRequirement(sidejobName: SidejobName): number;
  listSidejobs(): ISidejob[];
  getSidejobByCloneId(cloneId: string): ISidejob | undefined;
  getSidejobById(sidejobId: string): ISidejob | undefined;
  makeSidejob(sidejobParameters: IMakeSidejobParameters): ISidejob;
  assignSidejob(sidejobParameters: IAssignSidejobArguments): boolean;
  cancelSidejob(sidejobId: string): void;
  cancelAllSidejobs(): void;
  filterSidejobs(): void;
  perform(): void;
}
