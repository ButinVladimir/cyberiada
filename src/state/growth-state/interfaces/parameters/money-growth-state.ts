import { IncomeSource } from '@shared/types';

export interface IMoneyGrowthState {
  totalGrowth: number;
  getGrowth(incomeSource: IncomeSource): number;
  resetValues(): void;
}
