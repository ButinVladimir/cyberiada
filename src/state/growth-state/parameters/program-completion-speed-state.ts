import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { OtherProgramName } from '@state/progam-factory/types';
import { PredictiveComputatorProgram } from '@state/progam-factory/programs/predictive-computator';
import { TYPES } from '@state/types';
import { GROWTH_STATE_UI_EVENTS } from '../constants';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import { IProgramCompletionSpeedState } from '../interfaces/parameters/program-completion-speed-state';

const { lazyInject } = decorators;

@injectable()
export class ProgramCompletionSpeedState implements IProgramCompletionSpeedState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  private _multiplierByProgram: number;
  private _totalMultiplier: number;
  private _multiplierUpdateRequested: boolean;

  constructor() {
    this._multiplierByProgram = 1;
    this._totalMultiplier = 1;
    this._multiplierUpdateRequested = false;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get multiplierByProgram() {
    this._stateUiConnector.connectEventHandler(this, GROWTH_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED);

    return this._multiplierByProgram;
  }

  get totalMultiplier() {
    this._stateUiConnector.connectEventHandler(this, GROWTH_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED);

    return this._totalMultiplier;
  }

  requestMultiplierRecalculation() {
    this._multiplierUpdateRequested = true;
  }

  recalculateMultipliers() {
    if (!this._multiplierUpdateRequested) {
      return;
    }

    this._multiplierUpdateRequested = false;

    this.updateMultiplierByProgram();
    this.updateTotalMultiplier();

    this.uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED);
  }

  private updateMultiplierByProgram() {
    const mainframeProcessesState = this._mainframeState.processes;

    const predictiveComputatorProcess = mainframeProcessesState.getProcessByName(OtherProgramName.predictiveComputator);
    let newValue = 1;

    if (predictiveComputatorProcess?.isActive) {
      newValue = (
        predictiveComputatorProcess.program as PredictiveComputatorProgram
      ).calculateProgramCompletionSpeedMultiplier(
        mainframeProcessesState.availableCores,
        mainframeProcessesState.availableRam,
      );
    }

    this._multiplierByProgram = newValue;
  }

  private updateTotalMultiplier() {
    const mainframeHardwareState = this._mainframeState.hardware;

    this._totalMultiplier =
      this._multiplierByProgram *
      (1 +
        (mainframeHardwareState.performance.level - 1) *
          this._globalState.scenario.currentValues.mainframeSoftware.performanceBoost);
  }
}
