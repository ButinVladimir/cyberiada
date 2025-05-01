import { IUIEventEmitter } from '@shared/interfaces';

export interface ISynchronizationParameter extends IUIEventEmitter {
  baseValue: number;
  totalValue: number;
  requestRecalculation(): void;
  recalculate(): void;
}
