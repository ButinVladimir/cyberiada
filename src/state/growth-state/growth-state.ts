import { injectable, inject } from 'inversify';
import { EventBatcher } from '@shared/event-batcher';
import { TYPES } from '@state/types';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import type { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { ProgramName } from '@state/progam-factory/types';
import { CodeGeneratorProgram, PredictiveComputatorProgram, ShareServerProgram } from '@state/progam-factory/programs';
import { IncomeSource } from '@shared/types';
import { IGrowthState, IGrowthSerializedState } from './interfaces';
import { GROWTH_STATE_UI_EVENTS } from './constants';

@injectable()
export class GrowthState implements IGrowthState {
  private _scenarioState: IScenarioState;
  private _settingsState: ISettingsState;
  private _mainframeHardwareState: IMainframeHardwareState;
  private _mainframeProcessesState: IMainframeProcessesState;
  private readonly _uiEventBatcher: EventBatcher;

  private _isRecalculationRequested: boolean;
  private _programCompletionSpeedModifier: number;
  private _programCompletionSpeed: number;
  private _moneyIncomeTotal: number;
  private _cityDevelopmentSpeedTotal: number;
  private _moneyIncome: Map<IncomeSource, number>;
  private _cityDevelopmentPointsIncome: Map<IncomeSource, number>;
  private _codebasePointsByProgram: number;
  private _codebaseIncomeByProgram: number;
  private _programDiscount: number;

  constructor(
    @inject(TYPES.ScenarioState) _scenarioState: IScenarioState,
    @inject(TYPES.SettingsState) _settingsState: ISettingsState,
    @inject(TYPES.MainframeHardwareState) _mainframeHardwareState: IMainframeHardwareState,
    @inject(TYPES.MainframeProcessesState) _mainframeProcessesState: IMainframeProcessesState,
  ) {
    this._scenarioState = _scenarioState;
    this._settingsState = _settingsState;
    this._mainframeHardwareState = _mainframeHardwareState;
    this._mainframeProcessesState = _mainframeProcessesState;

    this._isRecalculationRequested = false;
    this._programCompletionSpeedModifier = 1;
    this._programCompletionSpeed = 1;
    this._moneyIncomeTotal = 0;
    this._cityDevelopmentSpeedTotal = 0;
    this._moneyIncome = new Map<IncomeSource, number>();
    this._cityDevelopmentPointsIncome = new Map<IncomeSource, number>();
    this._codebasePointsByProgram = 1;
    this._codebaseIncomeByProgram = 0;
    this._programDiscount = 0;

    this._uiEventBatcher = new EventBatcher();
  }

  get programCompletionSpeedModifier() {
    return this._programCompletionSpeedModifier;
  }

  get programCompletionSpeed() {
    return this._programCompletionSpeed;
  }

  get moneyIncomeTotal() {
    return this._moneyIncomeTotal;
  }

  get cityDevelopmentSpeedTotal() {
    return this._cityDevelopmentSpeedTotal;
  }

  get codebasePointsByProgram() {
    return this._codebasePointsByProgram;
  }

  get codebaseIncomeByProgram() {
    return this._codebaseIncomeByProgram;
  }

  get programDiscount() {
    return this._programDiscount;
  }

  requestRecalculation() {
    this._isRecalculationRequested = true;
  }

  recalculate() {
    if (!this._isRecalculationRequested) {
      return;
    }

    this._isRecalculationRequested = false;

    this.updateProgramCompletionSpeed();
    this.updateMoneyIncome();
    this.updateCityDevelopmentSpeed();
    this.updateCodebaseIncome();
    this.updateProgramDiscount();

    this._uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED);
  }

  getMoneyIncomeBySource(incomeSource: IncomeSource): number {
    return this._moneyIncome.get(incomeSource) ?? 0;
  }

  getCityDevelopmentSpeedBySource(incomeSource: IncomeSource): number {
    return this._cityDevelopmentPointsIncome.get(incomeSource) ?? 0;
  }

  increaseCodebaseByProgram(delta: number) {
    this._codebasePointsByProgram += delta;

    this.requestRecalculation();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._codebasePointsByProgram = 1;

    this.requestRecalculation();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IGrowthSerializedState): Promise<void> {
    this._codebasePointsByProgram = serializedState.codebasePointsByProgram;

    this.requestRecalculation();
  }

  serialize(): IGrowthSerializedState {
    return {
      codebasePointsByProgram: this.codebasePointsByProgram,
    };
  }

  addUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.addListener(eventName, handler);
  }

  removeUiEventListener(eventName: symbol, handler: (...args: any[]) => void) {
    this._uiEventBatcher.removeListener(eventName, handler);
  }

  fireUiEvents() {
    this._uiEventBatcher.fireEvents();
  }

  private updateProgramCompletionSpeed() {
    this.updateProgramCompletionSpeedMultiplier();

    const newValue =
      this._programCompletionSpeedModifier *
      (1 +
        (this._mainframeHardwareState.performance - 1) *
          this._scenarioState.currentValues.mainframeSoftware.performanceBoost);

    this._programCompletionSpeed = newValue;
  }

  private updateProgramCompletionSpeedMultiplier() {
    const predictiveComputatorProcess = this._mainframeProcessesState.getProcessByName(
      ProgramName.predictiveComputator,
    );
    let newValue = 1;

    if (predictiveComputatorProcess?.isActive) {
      newValue = (
        predictiveComputatorProcess.program as PredictiveComputatorProgram
      ).calculateProgramCompletionSpeedMultiplier(
        this._mainframeProcessesState.availableCores,
        this._mainframeProcessesState.availableRam,
      );
    }

    this._programCompletionSpeedModifier = newValue;
  }

  private updateMoneyIncome() {
    const incomeByProgram = this.updateMoneyIncomeByProgram();

    this._moneyIncomeTotal = incomeByProgram;
  }

  private updateMoneyIncomeByProgram(): number {
    const shareServerProcess = this._mainframeProcessesState.getProcessByName(ProgramName.shareServer);
    let incomeByProgram = 0;

    if (shareServerProcess?.isActive) {
      incomeByProgram = (shareServerProcess.program as ShareServerProgram).calculateMoneyDelta(
        this._mainframeProcessesState.availableCores,
        this._mainframeProcessesState.availableRam,
        1,
      );
    }

    this._moneyIncome.set(IncomeSource.program, incomeByProgram);

    return incomeByProgram;
  }

  private updateCityDevelopmentSpeed() {
    const incomeByProgram = this.updateCityDevelopmentSpeedByProgram();

    this._cityDevelopmentSpeedTotal = incomeByProgram;
  }

  private updateCityDevelopmentSpeedByProgram(): number {
    const shareServerProcess = this._mainframeProcessesState.getProcessByName(ProgramName.shareServer);
    let newValue = 0;

    if (shareServerProcess?.isActive) {
      newValue = (shareServerProcess.program as ShareServerProgram).calculateCityDevelopmentPointsDelta(
        this._mainframeProcessesState.availableCores,
        this._mainframeProcessesState.availableRam,
        1,
      );
    }

    this._cityDevelopmentPointsIncome.set(IncomeSource.program, newValue);

    return newValue;
  }

  private updateCodebaseIncome() {
    const codeGeneratorProcess = this._mainframeProcessesState.getProcessByName(ProgramName.codeGenerator);
    let newValue = 0;

    if (codeGeneratorProcess?.isActive) {
      const timeToFinish = Math.max(
        codeGeneratorProcess.maxCompletionPoints / this.programCompletionSpeed,
        this._settingsState.updateInterval,
      );
      newValue =
        (codeGeneratorProcess.program as CodeGeneratorProgram).calculateDelta(codeGeneratorProcess.threads) /
        timeToFinish;
    }

    this._codebaseIncomeByProgram = newValue;
  }

  private updateProgramDiscount() {
    let logSum = 1;
    logSum += Math.log(this.codebasePointsByProgram) / Math.log(this._scenarioState.currentValues.discounts.program);

    this._programDiscount = 1 - 1 / logSum;
  }
}
