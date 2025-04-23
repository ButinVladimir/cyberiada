import { ISerializeable } from '@shared/interfaces/serializable';
import { ICompanySerializedState } from './company-serialized-state';
import { ICloneFactory } from '../states/clone-factory/interfaces/clone-factory';
import { ICompanyClonesState } from '../states/clones-state/interfaces/clones-state';

export interface ICompanyState extends ISerializeable<ICompanySerializedState> {
  cloneFactory: ICloneFactory;
  clones: ICompanyClonesState;
}
