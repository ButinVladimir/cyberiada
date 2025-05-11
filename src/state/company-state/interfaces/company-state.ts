import { ISerializeable } from '@shared/interfaces/serializable';
import { ICompanySerializedState } from './company-serialized-state';
import { ICloneFactory, ICompanyClonesState, ISidejobsState } from '../states';

export interface ICompanyState extends ISerializeable<ICompanySerializedState> {
  cloneFactory: ICloneFactory;
  clones: ICompanyClonesState;
  sidejobs: ISidejobsState;
  requestReassignment(): void;
  processTick(): void;
}
