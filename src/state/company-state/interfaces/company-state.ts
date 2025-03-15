import { ISerializeable } from '@shared/interfaces/serializable';
import { ICompanySerializedState } from './company-serialized-state';
import { ICloneFactory } from '../states/clone-factory/interfaces';

export interface ICompanyState extends ISerializeable<ICompanySerializedState> {
  cloneFactory: ICloneFactory;
}
