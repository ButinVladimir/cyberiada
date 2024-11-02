import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';

export interface IProgramCompletionSpeedParameter extends IUIEventEmitter {
  multiplier: number;
  speed: number;
  requestRecalculation(): void;
  recalculate(): void;
}
