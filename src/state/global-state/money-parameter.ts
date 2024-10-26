import { IncomeSource, PurchaseType } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { IMoneyParameter } from './interfaces/money-parameter';
import { IMoneySerializedParameter } from './interfaces/serialized-states/money-serialized-parameter';
import { IMoneyConstructorParameters } from './interfaces/constructor-parameters/money-constructor-parameters';
import { GLOBAL_STATE_UI_EVENTS } from './constants';

export class MoneyParameter implements IMoneyParameter {
  private _scenarioState: IScenarioState;
  private readonly _uiEventBatcher: EventBatcher;

  private _money: number;
  private _income: Map<IncomeSource, number>;
  private _expenses: Map<PurchaseType, number>;

  constructor(parameters: IMoneyConstructorParameters) {
    this._scenarioState = parameters.scenarioState;

    this._money = 0;
    this._income = new Map<IncomeSource, number>();
    this._expenses = new Map<PurchaseType, number>();

    this._uiEventBatcher = new EventBatcher();
  }

  get money() {
    return this._money;
  }

  increase(moneyDelta: number, incomeSource: IncomeSource): void {
    this._money += moneyDelta;
    const prevIncome = this.getIncome(incomeSource);
    this._income.set(incomeSource, prevIncome + moneyDelta);

    this._uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.MONEY_INCREASED);
    this._uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.MONEY_CHANGED);
  }

  purchase(cost: number, purchaseType: PurchaseType, handler: () => void): boolean {
    if (this._money >= cost) {
      this._money -= cost;
      handler();

      const prevExpenses = this.getExpenses(purchaseType);
      this._expenses.set(purchaseType, prevExpenses + cost);

      this._uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.MONEY_SPENT);
      this._uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.MONEY_CHANGED);

      return true;
    }

    return false;
  }

  getIncome(incomeSource: IncomeSource): number {
    return this._income.get(incomeSource) ?? 0;
  }

  getExpenses(purchaseType: PurchaseType): number {
    return this._expenses.get(purchaseType) ?? 0;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._money = this._scenarioState.currentValues.startingMoney;
    this._income.clear();
    this._expenses.clear();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IMoneySerializedParameter): Promise<void> {
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

  serialize(): IMoneySerializedParameter {
    return {
      money: this._money,
      income: Object.fromEntries(this._income.entries()) as Record<IncomeSource, number>,
      expenses: Object.fromEntries(this._expenses.entries()) as Record<PurchaseType, number>,
    };
  }

  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void {
    this._uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void): void {
    this._uiEventBatcher.removeListener(eventName, handler);
  }

  fireUiEvents(): void {
    this._uiEventBatcher.fireEvents();
  }
}
