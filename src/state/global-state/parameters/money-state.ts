import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { IncomeSource, PurchaseType } from '@shared/types';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { TYPES } from '@state/types';
import { IMoneyState } from '../interfaces/parameters/money-state';
import { IMoneySerializedState } from '../interfaces/serialized-states/money-serialized-state';
import type { IGlobalState } from '../interfaces/global-state';

const { lazyInject } = decorators;

@injectable()
export class MoneyState implements IMoneyState {
  private UI_EVENTS = {
    MONEY_SPENT: Symbol('MONEY_SPENT'),
  };

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  private _money: number;
  private _income: Map<IncomeSource, number>;
  private _expenses: Map<PurchaseType, number>;

  constructor() {
    this._money = 0;
    this._income = new Map<IncomeSource, number>();
    this._expenses = new Map<PurchaseType, number>();

    this._stateUiConnector.registerEvents(this.UI_EVENTS);
  }

  get money() {
    return this._money;
  }

  increase(moneyDelta: number, incomeSource: IncomeSource): void {
    this._money += moneyDelta;
    const prevIncome = this.getIncome(incomeSource);
    this._income.set(incomeSource, prevIncome + moneyDelta);
  }

  purchase(cost: number, purchaseType: PurchaseType, handler: () => void): boolean {
    if (this._money >= cost) {
      this._money -= cost;
      handler();

      const prevExpenses = this.getExpenses(purchaseType);
      this._expenses.set(purchaseType, prevExpenses + cost);

      this._stateUiConnector.enqueueEvent(this.UI_EVENTS.MONEY_SPENT);

      return true;
    }

    return false;
  }

  getIncome(incomeSource: IncomeSource): number {
    return this._income.get(incomeSource) ?? 0;
  }

  getExpenses(purchaseType: PurchaseType): number {
    this._stateUiConnector.connectEventHandler(this.UI_EVENTS.MONEY_SPENT);

    return this._expenses.get(purchaseType) ?? 0;
  }

  async startNewState(): Promise<void> {
    this._money = this._globalState.scenario.currentValues.startingMoney;
    this._income.clear();
    this._expenses.clear();
  }

  async deserialize(serializedState: IMoneySerializedState): Promise<void> {
    this._money = serializedState.money;

    this._income.clear();
    Object.entries(serializedState.income).forEach(([incomeSource, value]) => {
      this._income.set(incomeSource as IncomeSource, value);
    });

    this._expenses.clear();
    Object.entries(serializedState.expenses).forEach(([purchaseType, value]) => {
      this._expenses.set(purchaseType as PurchaseType, value);
    });
  }

  serialize(): IMoneySerializedState {
    return {
      money: this._money,
      income: Object.fromEntries(this._income.entries()) as Record<IncomeSource, number>,
      expenses: Object.fromEntries(this._expenses.entries()) as Record<PurchaseType, number>,
    };
  }
}
