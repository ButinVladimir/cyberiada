import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { IncomeSource } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { TYPES } from '@state/types';
import { OtherProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { ShareServerProgram } from '@state/mainframe-state/states/progam-factory/programs/share-server';
import { INCOME_SOURCES } from '@shared/constants';
import { IDevelopmentGrowthState } from '../interfaces/parameters/development-growth-state';
import { GROWTH_STATE_UI_EVENTS } from '../constants';

const { lazyInject } = decorators;

@injectable()
export class DevelopmentGrowthState implements IDevelopmentGrowthState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  private _totalGrowth: number;
  private _growth: Map<IncomeSource, number>;
  private _updateRequested: boolean;

  constructor() {
    this._totalGrowth = 0;
    this._growth = new Map<IncomeSource, number>();
    this._updateRequested = true;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get totalGrowth() {
    this._stateUiConnector.connectEventHandler(this, GROWTH_STATE_UI_EVENTS.DEVELOPMENT_GROWTH_CHANGED);

    return this._totalGrowth;
  }

  getGrowth(incomeSource: IncomeSource): number {
    this._stateUiConnector.connectEventHandler(this, GROWTH_STATE_UI_EVENTS.DEVELOPMENT_GROWTH_CHANGED);

    return this._growth.get(incomeSource) ?? 0;
  }

  requestGrowthRecalculation() {
    this._updateRequested = true;
  }

  recalculateGrowth() {
    if (!this._updateRequested) {
      return;
    }

    this._updateRequested = false;

    this.updateGrowthByProgram();
    this.updateTotalGrowth();

    this.uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.DEVELOPMENT_GROWTH_CHANGED);
  }

  private updateGrowthByProgram() {
    const mainframeProcessesState = this._mainframeState.processes;

    const shareServerProcess = mainframeProcessesState.getProcessByName(OtherProgramName.shareServer);
    let incomeByProgram = 0;

    if (shareServerProcess?.isActive) {
      incomeByProgram = (shareServerProcess.program as ShareServerProgram).calculateDevelopmentPointsDelta(
        mainframeProcessesState.availableCores,
        mainframeProcessesState.availableRam,
        1,
      );
    }

    this._growth.set(IncomeSource.program, incomeByProgram);
  }

  private updateTotalGrowth() {
    this._totalGrowth = INCOME_SOURCES.reduce((sum, incomeSource) => sum + this.getGrowth(incomeSource), 0);
  }
}
