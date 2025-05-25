import { ISerializeable } from '@shared/interfaces';
import { ICompanyClonesSerializedState } from './clones-serialized-state';
import { IClone } from '../../clone-factory/interfaces/clone';
import { CloneTemplateName } from '../../clone-factory';
import { IPurchaseCloneArgs } from './purchase-clone-args';
import { IExperienceShareParameter } from './experience-share-parameter';

export interface ICompanyClonesState extends ISerializeable<ICompanyClonesSerializedState> {
  availableSynchronization: number;
  experienceShare: IExperienceShareParameter;
  listClones(): IClone[];
  earnCloneExperience(id: string, delta: number): void;
  getCloneById(id: string): IClone | undefined;
  getCloneCost(template: CloneTemplateName, tier: number, level: number): number;
  getCloneSynchronization(template: CloneTemplateName, tier: number): number;
  purchaseClone(args: IPurchaseCloneArgs): boolean;
  toggleAllClonesAutoupgrade(active: boolean): void;
  deleteClone(id: string): void;
  deleteAllClones(): void;
  recalculateClones(): void;
  updateSynchronization(): void;
  moveClone(id: string, newPosition: number): void;
  generateCloneName(): Promise<string>;
  upgradeMaxAllLevels(): void;
}
