import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';

export interface IProgramCompletionSpeedState extends IUIEventEmitter {
  multiplierByProgram: number;
  totalMultiplier: number;
  requestMultiplierRecalculation(): void;
  recalculateMultipliers(): void;
}
