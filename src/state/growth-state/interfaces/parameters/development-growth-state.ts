import { IncomeSource } from '@shared/types';

export interface IDevelopmentGrowthState {
  totalGrowth: number;
  getGrowth(incomeSource: IncomeSource): number;
  resetValues(): void;
}
