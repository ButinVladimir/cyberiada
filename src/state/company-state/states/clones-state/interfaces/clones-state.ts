import { ISerializeable, IUIEventEmitter } from '@shared/interfaces';
import { ICompanyClonesSerializedState } from './clones-serialized-state';
import { IClone } from '../../clone-factory/interfaces/clone';
import { CloneTemplateName } from '../../clone-factory';

export interface ICompanyClonesState extends IUIEventEmitter, ISerializeable<ICompanyClonesSerializedState> {
  totalSynchronization: number;
  availableSynchronization: number;
  listClones(): IClone[];
  getCloneById(id: string): IClone | undefined;
  getCloneCost(template: CloneTemplateName, quality: number, level: number): number;
  getCloneSynchronization(template: CloneTemplateName, quality: number): number;
  purchaseClone(name: string, template: CloneTemplateName, quality: number, level: number): boolean;
  toggleAllClonesAutoupgrade(active: boolean): void;
  deleteClone(id: string): void;
  deleteAllClones(): void;
  recalculate(): void;
  moveClone(id: string, newPosition: number): void;
  generateCloneName(): Promise<string>;
}
