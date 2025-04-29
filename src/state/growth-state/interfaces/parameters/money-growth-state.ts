import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IncomeSource } from '@shared/types';

export interface IMoneyGrowthState extends IUIEventEmitter {
  totalGrowth: number;
  getGrowth(incomeSource: IncomeSource): number;
  recalculateGrowth(): void;
}
