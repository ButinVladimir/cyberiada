import { ISerializeable } from '@shared/interfaces/serializable';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { IncomeSource, PurchaseType } from '@shared/types';
import { IMoneySerializedParameter } from './serialized-states/money-serialized-parameter';

export interface IMoneyParameter extends ISerializeable<IMoneySerializedParameter>, IUIEventEmitter {
  money: number;
  increase(moneyDelta: number, incomeSource: IncomeSource): void;
  purchase(cost: number, purchaseType: PurchaseType, handler: () => void): boolean;
  getIncome(incomeSource: IncomeSource): number;
  getExpenses(purchaseType: PurchaseType): number;
}
