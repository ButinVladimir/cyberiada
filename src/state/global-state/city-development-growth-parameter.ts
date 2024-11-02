import { IncomeSource } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { ProgramName } from '@state/progam-factory/types';
import { ShareServerProgram } from '@state/progam-factory/programs/share-server';
import { ICityDevelopmentGrowthParameter } from './interfaces/city-development-growth-parameter';
import { ICityDevelopmentGrowthConstructorParameters } from './interfaces/constructor-parameters/city-development-growth-constructor-parameters';
import { GLOBAL_STATE_UI_EVENTS } from './constants';
import { INCOME_SOURCES } from '@/shared';

export class CityDevelopmentGrowthParameter implements ICityDevelopmentGrowthParameter {
  private _mainframeProcessesState: IMainframeProcessesState;

  private readonly _uiEventBatcher: EventBatcher;

  private _totalGrowth: number;
  private _growth: Map<IncomeSource, number>;
  private _updateRequested: boolean;

  constructor(parameters: ICityDevelopmentGrowthConstructorParameters) {
    this._mainframeProcessesState = parameters.mainframeProcessesState;

    this._totalGrowth = 0;
    this._growth = new Map<IncomeSource, number>();

    this._updateRequested = true;

    this._uiEventBatcher = new EventBatcher();
  }

  get totalGrowth() {
    return this._totalGrowth;
  }

  getGrowth(incomeSource: IncomeSource): number {
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

    this._uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_GROWTH_CHANGED);
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

  private updateGrowthByProgram() {
    const shareServerProcess = this._mainframeProcessesState.getProcessByName(ProgramName.shareServer);
    let incomeByProgram = 0;

    if (shareServerProcess?.isActive) {
      incomeByProgram = (shareServerProcess.program as ShareServerProgram).calculateCityDevelopmentPointsDelta(
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
