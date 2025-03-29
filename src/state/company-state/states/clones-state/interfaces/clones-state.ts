import { ISerializeable, IUIEventEmitter } from '@shared/interfaces';
import { ICompanyClonesSerializedState } from './clones-serialized-state';
import { IClone } from '../../clone-factory/interfaces/clone';
import { IMakeCloneParameters } from '../../clone-factory/interfaces/make-clone-parameters';

export interface ICompanyClonesState extends IUIEventEmitter, ISerializeable<ICompanyClonesSerializedState> {
  totalSynchronization: number;
  availableSynchronization: number;
  experienceModifier: number;
  extraExperience: number;
  listClones(): IClone[];
  getCloneById(id: string): IClone | undefined;
  purchaseClone(cloneParameters: IMakeCloneParameters): boolean;
  toggleAllClones(active: boolean): void;
  deleteClone(id: string): void;
  deleteAllClones(): void;
  processTick(): void;
  moveClone(id: string, newPosition: number): void;
  earnExtraExperience(delta: number): void;
  spendExtraExperience(): void;
}
