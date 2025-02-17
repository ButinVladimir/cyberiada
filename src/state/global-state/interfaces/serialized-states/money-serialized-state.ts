import { IncomeSource, PurchaseType } from '@shared/types';

export interface IMoneySerializedState {
  money: number;
  income: Record<IncomeSource, number>;
  expenses: Record<PurchaseType, number>;
}
