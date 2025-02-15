import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializeable } from '@shared/interfaces/serializable';
import { IncomeSource, PurchaseType } from '@shared/types';
import { IMoneySerializedState } from '../serialized-states/money-serialized-state';

export interface IMoneyState extends ISerializeable<IMoneySerializedState>, IUIEventEmitter {
  money: number;
  getIncome(incomeSource: IncomeSource): number;
  getExpenses(purchaseType: PurchaseType): number;
  increase(moneyDelta: number, incomeSource: IncomeSource): void;
  purchase(cost: number, purchaseType: PurchaseType, handler: () => void): boolean;
}
