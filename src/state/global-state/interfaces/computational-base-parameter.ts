import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { IComputationalBaseSerializedParameter } from './serialized-states/computational-base-serialized-parameter';

export interface IComputationalBaseParameter
  extends ISerializeable<IComputationalBaseSerializedParameter>,
    IUIEventEmitter {
  pointsByProgram: number;
  discount: number;
  increaseByProgram(pointsDelta: number): void;
  requestDiscountRecalculation(): void;
  recalculateDiscount(): void;
}
