import { IncomeSource } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { ProgramName } from '@state/progam-factory/types';
import { ShareServerProgram } from '@state/progam-factory/programs/share-server';
import { IMoneyGrowthParameter } from './interfaces/money-growth-parameter';
import { IMoneyGrowthConstructorParameters } from './interfaces/constructor-parameters/money-growth-constructor-parameters';
import { GLOBAL_STATE_UI_EVENTS } from './constants';
import { INCOME_SOURCES } from '@shared/constants';

export class MoneyGrowthParameter implements IMoneyGrowthParameter {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;
  private _mainframeProcessesState: IMainframeProcessesState;

  private _totalGrowth: number;
  private _growth: Map<IncomeSource, number>;
  private _updateRequested: boolean;

  constructor(parameters: IMoneyGrowthConstructorParameters) {
    this._stateUiConnector = parameters.stateUiConnector;
    this._mainframeProcessesState = parameters.mainframeProcessesState;

    this._totalGrowth = 0;
    this._growth = new Map<IncomeSource, number>();

    this._updateRequested = true;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get totalGrowth() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.MONEY_GROWTH_CHANGED);

    return this._totalGrowth;
  }

  getGrowth(incomeSource: IncomeSource): number {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.MONEY_GROWTH_CHANGED);

    return this._growth.get(incomeSource) ?? 0;
  }

  requestRecalculation() {
    this._updateRequested = true;
  }

  recalculate() {
    if (!this._updateRequested) {
      return;
    }

    this._updateRequested = false;

    this.updateGrowthByProgram();
    this.updateTotalGrowth();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.MONEY_GROWTH_CHANGED);
  }

  private updateGrowthByProgram() {
    const shareServerProcess = this._mainframeProcessesState.getProcessByName(ProgramName.shareServer);
    let incomeByProgram = 0;

    if (shareServerProcess?.isActive) {
      incomeByProgram = (shareServerProcess.program as ShareServerProgram).calculateMoneyDelta(
        this._mainframeProcessesState.availableCores,
        this._mainframeProcessesState.availableRam,
        1,
      );
    }

    this._growth.set(IncomeSource.program, incomeByProgram);
  }

  private updateTotalGrowth() {
    this._totalGrowth = INCOME_SOURCES.reduce((sum, incomeSource) => sum + this.getGrowth(incomeSource), 0);
  }
}
