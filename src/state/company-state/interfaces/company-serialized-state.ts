import { ISidejobsSerializedState, ICompanyClonesSerializedState } from '../states';

export interface ICompanySerializedState {
  clones: ICompanyClonesSerializedState;
  sidejobs: ISidejobsSerializedState;
}
