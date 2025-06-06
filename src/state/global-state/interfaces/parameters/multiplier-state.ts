import { ISerializeable } from '@shared/interfaces/serializable';
import { IMultiplierSerializedState } from '../serialized-states/multiplier-serialized-state';

export interface IMultiplierState extends ISerializeable<IMultiplierSerializedState> {
  pointsByProgram: number;
  programMultiplier: number;
  totalMultiplier: number;
  increasePointsByProgram(pointsDelta: number): void;
  recalculateMultipliers(): void;
}
