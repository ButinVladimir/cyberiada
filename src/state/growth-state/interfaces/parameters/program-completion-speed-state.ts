import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';

export interface IProgramCompletionSpeedState extends IUIEventEmitter {
  multiplierByHardware: number;
  multiplierByProgram: number;
  totalMultiplier: number;
  requestMultipliersRecalculation(): void;
  recalculateMultipliers(): void;
}
