import { IncomeSource, PurchaseType } from '@shared/index';

export interface IMoneySerializedState {
  money: number;
  income: Record<IncomeSource, number>;
  expenses: Record<PurchaseType, number>;
}
