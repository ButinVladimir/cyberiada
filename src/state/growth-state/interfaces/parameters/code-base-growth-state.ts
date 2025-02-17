import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';

export interface ICodeBaseGrowthState extends IUIEventEmitter {
  growthByProgram: number;
  requestGrowthRecalculation(): void;
  recalculateGrowth(): void;
}
