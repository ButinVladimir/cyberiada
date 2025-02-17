import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { IComputationalBaseSerializedState } from '../../serialized-states/multipliers/computational-base-serialized-state';

export interface IComputationalBaseState extends ISerializeable<IComputationalBaseSerializedState>, IUIEventEmitter {
  pointsByProgram: number;
  costMultiplierByProgram: number;
  totalCostMultiplier: number;
  increasePointsByProgram(pointsDelta: number): void;
  requestCostMultipliersRecalculation(): void;
  recalculateCostMultipliers(): void;
}
