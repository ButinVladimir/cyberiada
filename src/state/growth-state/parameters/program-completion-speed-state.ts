import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { OtherProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { PredictiveComputatorProgram } from '@state/mainframe-state/states/progam-factory/programs/predictive-computator';
import { TYPES } from '@state/types';
import type { IGlobalState } from '@state/global-state/interfaces/global-state';
import { IProgramCompletionSpeedState } from '../interfaces/parameters/program-completion-speed-state';
import { GROWTH_STATE_UI_EVENTS } from '../constants';

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
  private _multiplierByHardware: number;
  private _totalMultiplier: number;
  private _multiplierUpdateRequested: boolean;

  constructor() {
    this._multiplierByProgram = 1;
    this._multiplierByHardware = 1;
    this._totalMultiplier = 1;
    this._multiplierUpdateRequested = true;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get multiplierByProgram() {
    this._stateUiConnector.connectEventHandler(this, GROWTH_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED);

    return this._multiplierByProgram;
  }

  get multiplierByHardware() {
    this._stateUiConnector.connectEventHandler(this, GROWTH_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED);

    return this._multiplierByHardware;
  }

  get totalMultiplier() {
    this._stateUiConnector.connectEventHandler(this, GROWTH_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED);

    return this._totalMultiplier;
  }

  requestMultipliersRecalculation() {
    this._multiplierUpdateRequested = true;
  }

  recalculateMultipliers() {
    if (!this._multiplierUpdateRequested) {
      return;
    }

    this._multiplierUpdateRequested = false;

    this.updateMultiplierByProgram();
    this.updateMultiplierByHardware();
    this.updateTotalMultiplier();
  }

  private updateMultiplierByProgram() {
    const mainframeProcessesState = this._mainframeState.processes;

    const predictiveComputatorProcess = mainframeProcessesState.getProcessByName(OtherProgramName.predictiveComputator);

    let multiplierByProgram = 1;

    if (predictiveComputatorProcess?.isActive) {
      const predictiveComputatorProgram = predictiveComputatorProcess.program as PredictiveComputatorProgram;

      multiplierByProgram = predictiveComputatorProgram.calculateProgramCompletionSpeedMultiplier(
        predictiveComputatorProcess.usedCores,
        predictiveComputatorProcess.totalRam,
      );
    } else {
      multiplierByProgram = 1;
    }

    if (multiplierByProgram !== this._multiplierByProgram) {
      this._multiplierByProgram = multiplierByProgram;

      this.uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED);
    }
  }

  private updateMultiplierByHardware() {
    const mainframeHardwareState = this._mainframeState.hardware;

    const multiplierByHardware =
      1 +
      Math.pow(
        this._globalState.scenario.currentValues.mainframeSoftware.performanceBoost,
        mainframeHardwareState.performance.totalLevel,
      );

    if (multiplierByHardware !== this._multiplierByHardware) {
      this._multiplierByHardware = multiplierByHardware;

      this.uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED);
    }
  }

  private updateTotalMultiplier() {
    const totalMultiplier = this._multiplierByProgram * this._multiplierByHardware;

    if (totalMultiplier !== this._totalMultiplier) {
      this._totalMultiplier = totalMultiplier;

      this.uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED);
    }
  }
}
