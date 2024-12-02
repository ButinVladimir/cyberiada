import { EventBatcher } from '@shared/event-batcher';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { IMainframeHardwareState } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-state';
import { IScenarioState } from '@state/scenario-state/interfaces/scenario-state';
import { ProgramName } from '@state/progam-factory/types';
import { PredictiveComputatorProgram } from '@state/progam-factory/programs/predictive-computator';
import { GLOBAL_STATE_UI_EVENTS } from './constants';
import { IProgramCompletionSpeedParameter } from './interfaces/program-completion-speed-parameter';
import { IProgramCompletionSpeedConstructorParameters } from './interfaces/constructor-parameters/program-completion-speed-constructor-parameters';

export class ProgramCompletionSpeedParameter implements IProgramCompletionSpeedParameter {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;
  private _mainframeProcessesState: IMainframeProcessesState;
  private _mainframeHardwareState: IMainframeHardwareState;
  private _scenarioState: IScenarioState;

  private _multiplier: number;
  private _speed: number;
  private _updateRequested: boolean;

  constructor(parameters: IProgramCompletionSpeedConstructorParameters) {
    this._stateUiConnector = parameters.stateUiConnector;
    this._mainframeProcessesState = parameters.mainframeProcessesState;
    this._mainframeHardwareState = parameters.mainframeHardwareState;
    this._scenarioState = parameters.scenarioState;

    this._multiplier = 1;
    this._speed = 1;
    this._updateRequested = false;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get multiplier() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED);

    return this._multiplier;
  }

  get speed() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED);

    return this._speed;
  }

  requestRecalculation() {
    this._updateRequested = true;
  }

  recalculate() {
    if (!this._updateRequested) {
      return;
    }

    this._updateRequested = false;
    this.updateMultiplier();
    this.updateSpeed();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED);
  }

  private updateMultiplier() {
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

    this._multiplier = newValue;
  }

  private updateSpeed() {
    this._speed =
      this._multiplier *
      (1 +
        (this._mainframeHardwareState.performance.level - 1) *
          this._scenarioState.currentValues.mainframeSoftware.performanceBoost);
  }
}
