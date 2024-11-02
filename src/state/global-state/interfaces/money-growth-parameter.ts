import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IncomeSource } from '@shared/types';

export interface IMoneyGrowthParameter extends IUIEventEmitter {
  totalGrowth: number;
  setGrowth(incomeSource: IncomeSource, value: number): void;
  getGrowth(incomeSource: IncomeSource): number;
  requestRecalculation(): void;
  recalculate(): void;
}
