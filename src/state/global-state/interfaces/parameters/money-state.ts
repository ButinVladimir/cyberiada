import { ISerializeable, ISnapshotable, IncomeSource, PurchaseType } from '@shared/index';
import { IMoneySerializedState } from '../serialized-states';
import { IMoneySnapshotState } from '../snapshot-states';

export interface IMoneyState extends ISerializeable<IMoneySerializedState>, ISnapshotable<IMoneySnapshotState> {
  money: number;
  getIncome(incomeSource: IncomeSource): number;
  getExpenses(purchaseType: PurchaseType): number;
  increase(moneyDelta: number, incomeSource: IncomeSource): void;
  purchase(cost: number, purchaseType: PurchaseType, handler: () => void): boolean;
}
