import { IncomeSource, PurchaseType } from '@shared/index';

export interface IMoneySnapshotState {
  money: number;
  income: Record<IncomeSource, number>;
  expenses: Record<PurchaseType, number>;
}
