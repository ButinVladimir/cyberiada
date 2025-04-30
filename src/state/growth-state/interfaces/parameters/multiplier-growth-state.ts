import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';

export interface IMultiplierGrowthState extends IUIEventEmitter {
  growthByProgram: number;
  recalculateGrowth(): void;
}
