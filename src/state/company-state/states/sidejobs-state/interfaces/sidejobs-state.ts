import { ISerializeable, IUIEventEmitter } from '@shared/index';
import { SidejobName } from '../types';
import { ISidejobsSerializedState } from './sidejobs-serialized-state';
import { ISidejob } from './sidejob';
import { IMakeSidejobParameters } from './make-sidejob-parameters';

export interface ISidejobsState extends IUIEventEmitter, ISerializeable<ISidejobsSerializedState> {
  getConnectivityRequirement(sidejobName: SidejobName): number;
  getSidejobByNameAndDistrict(sidejobName: SidejobName, districtIndex: number): ISidejob | undefined;
  listSidejobs(): ISidejob[];
  getSidejobByCloneId(cloneId: string): ISidejob | undefined;
  getSidejobById(sidejobId: string): ISidejob | undefined;
  makeSidejob(sidejobParameters: IMakeSidejobParameters): ISidejob;
  assignSidejob(sidejobParameters: IMakeSidejobParameters): boolean;
  removeSidejob(sidejobId: string): void;
  removeAllSidejobs(): void;
}
