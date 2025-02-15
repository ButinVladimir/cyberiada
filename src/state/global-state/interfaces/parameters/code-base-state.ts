import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { ICodeBaseSerializedState } from '../serialized-states/code-base-serialized-state';

export interface ICodeBaseState extends ISerializeable<ICodeBaseSerializedState>, IUIEventEmitter {
  pointsByProgram: number;
  costMultiplierByProgram: number;
  totalCostMultiplier: number;
  increasePointsByProgram(pointsDelta: number): void;
  requestCostMultipliersRecalculation(): void;
  recalculateCostMultipliers(): void;
}
