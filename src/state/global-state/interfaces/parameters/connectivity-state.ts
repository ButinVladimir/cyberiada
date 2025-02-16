import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { IConnectivitySerializedState } from '../serialized-states/connectivity-serialized-state';

export interface IConnectivityState extends ISerializeable<IConnectivitySerializedState>, IUIEventEmitter {
  pointsByProgram: number;
  costMultiplierByProgram: number;
  totalCostMultiplier: number;
  increasePointsByProgram(pointsDelta: number): void;
  requestCostMultipliersRecalculation(): void;
  recalculateCostMultipliers(): void;
}
