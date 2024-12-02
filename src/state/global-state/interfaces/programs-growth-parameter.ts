import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';

export interface IProgramsGrowthParameter extends IUIEventEmitter {
  computationalBase: number;
  requestRecalculation(): void;
  recalculate(): void;
}
