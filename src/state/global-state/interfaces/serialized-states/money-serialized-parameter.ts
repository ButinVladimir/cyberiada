import { IncomeSource, PurchaseType } from '@shared/types';

export interface IMoneySerializedParameter {
  money: number;
  income: Record<IncomeSource, number>;
  expenses: Record<PurchaseType, number>;
}
