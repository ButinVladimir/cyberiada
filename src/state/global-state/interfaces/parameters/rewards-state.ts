import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { IRewardsSerializedState } from '../serialized-states/rewards-serialized-state';

export interface IRewardsState extends ISerializeable<IRewardsSerializedState>, IUIEventEmitter {
  pointsByProgram: number;
  multiplierByProgram: number;
  totalMultiplier: number;
  increasePointsByProgram(pointsDelta: number): void;
  requestMultipliersRecalculation(): void;
  recalculateMultipliers(): void;
}
