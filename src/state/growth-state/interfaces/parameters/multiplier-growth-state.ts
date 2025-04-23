import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';

export interface IMultiplierGrowthState extends IUIEventEmitter {
  growthByProgram: number;
  requestGrowthRecalculation(): void;
  recalculateGrowth(): void;
}
