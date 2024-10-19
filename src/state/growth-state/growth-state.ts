import { injectable, inject } from 'inversify';
import { EventBatcher } from '@shared/event-batcher';
import { TYPES } from '@state/types';
import type { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import type { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import type { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { ProgramName } from '@state/progam-factory/types';
import { IGrowthState } from './interfaces';
import { GROWTH_STATE_UI_EVENTS } from './constants';
import { PredictiveComputatorProgram, ShareServerProgram } from '../progam-factory/programs';

@injectable()
export class GrowthState implements IGrowthState {
  private _scenarioState: IScenarioState;
  private _mainframeHardwareState: IMainframeHardwareState;
  private _mainframeProcessesState: IMainframeProcessesState;
  private readonly _uiEventBatcher: EventBatcher;

  private _programCompletionSpeedModifier: number;
  private _programCompletionSpeed: number;
  private _moneyIncomeByPrograms: number;
  private _moneyIncomeTotal: number;
  private _cityDevelopmentSpeedByPrograms: number;
  private _cityDevelopmentSpeedTotal: number;

  constructor(
    @inject(TYPES.ScenarioState) _scenarioState: IScenarioState,
    @inject(TYPES.MainframeHardwareState) _mainframeHardwareState: IMainframeHardwareState,
    @inject(TYPES.MainframeProcessesState) _mainframeProcessesState: IMainframeProcessesState,
  ) {
    this._scenarioState = _scenarioState;
    this._mainframeHardwareState = _mainframeHardwareState;
    this._mainframeProcessesState = _mainframeProcessesState;

    this._programCompletionSpeedModifier = 1;
    this._programCompletionSpeed = 1;
    this._moneyIncomeByPrograms = 0;
    this._moneyIncomeTotal = 0;
    this._cityDevelopmentSpeedByPrograms = 0;
    this._cityDevelopmentSpeedTotal = 0;

    this._uiEventBatcher = new EventBatcher();
  }

  get programCompletionSpeedModifier() {
    return this._programCompletionSpeedModifier;
  }

  get programCompletionSpeed() {
    return this._programCompletionSpeed;
  }

  get moneyIncomeByPrograms() {
    return this._moneyIncomeByPrograms;
  }

  get moneyIncomeTotal() {
    return this._moneyIncomeTotal;
  }

  get cityDevelopmentSpeedByPrograms() {
    return this._cityDevelopmentSpeedByPrograms;
  }

  get cityDevelopmentSpeedTotal() {
    return this._cityDevelopmentSpeedTotal;
  }

  recalculate() {
    this.handleUpdateProcesses();

    this.handleUpdateProgramCompletionSpeed();

    this._uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED);
  }

  private handleUpdateProcesses = () => {
    this.updateProgramCompletionSpeedMultiplier();
    this.updateMoneyIncomeByProgram();
    this.updateCityDevelopmentSpeedByProgram();
  };

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

    if (this._programCompletionSpeedModifier !== newValue) {
      this._programCompletionSpeedModifier = newValue;

      this.handleUpdateProgramCompletionSpeed();

      this._uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED);
    }
  }

  private handleUpdateProgramCompletionSpeed = () => {
    const newValue =
      this._programCompletionSpeedModifier *
      (1 +
        (this._mainframeHardwareState.performance - 1) *
          this._scenarioState.currentValues.mainframeSoftware.performanceBoost);

    if (this._programCompletionSpeed !== newValue) {
      this._programCompletionSpeed = newValue;

      this._uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED);
    }
  };

  private updateMoneyIncomeByProgram() {
    const shareServerProcess = this._mainframeProcessesState.getProcessByName(ProgramName.shareServer);
    let newValue = 0;

    if (shareServerProcess?.isActive) {
      newValue = (shareServerProcess.program as ShareServerProgram).calculateMoneyDelta(
        this._mainframeProcessesState.availableCores,
        this._mainframeProcessesState.availableRam,
        1,
      );
    }

    if (this._moneyIncomeByPrograms !== newValue) {
      this._moneyIncomeByPrograms = newValue;

      this.updateMoneyIncomeTotal();

      this._uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED);
    }
  }

  private updateMoneyIncomeTotal() {
    const newValue = this._moneyIncomeByPrograms;

    if (this._moneyIncomeTotal !== newValue) {
      this._moneyIncomeTotal = newValue;

      this._uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED);
    }
  }

  private updateCityDevelopmentSpeedByProgram() {
    const shareServerProcess = this._mainframeProcessesState.getProcessByName(ProgramName.shareServer);
    let newValue = 0;

    if (shareServerProcess?.isActive) {
      newValue = (shareServerProcess.program as ShareServerProgram).calculateCityDevelopmentPointsDelta(
        this._mainframeProcessesState.availableCores,
        this._mainframeProcessesState.availableRam,
        1,
      );
    }

    if (this._cityDevelopmentSpeedByPrograms !== newValue) {
      this._cityDevelopmentSpeedByPrograms = newValue;

      this.updateCityDevelopmentSpeedTotal();

      this._uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED);
    }
  }

  private updateCityDevelopmentSpeedTotal() {
    const newValue = this._cityDevelopmentSpeedByPrograms;

    if (this._cityDevelopmentSpeedTotal !== newValue) {
      this._cityDevelopmentSpeedTotal = newValue;

      this._uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED);
    }
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
}
