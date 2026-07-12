import { ISerializeable, ISnapshotable } from '@shared/index';
import { IOwnedClonesState, ICloneFactory } from '../states';
import { IClonesSerializedState } from './clones-serialized-state';
import { IClonesSnapshotState } from './clones-snapshot-state';

export interface IClonesState extends ISerializeable<IClonesSerializedState>, ISnapshotable<IClonesSnapshotState> {
  ownedClones: IOwnedClonesState;
  cloneFactory: ICloneFactory;
  recalculate(): void;
}
