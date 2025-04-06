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
    this._multiplierUpdateRequested = false;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get multiplierByProgram() {
    return this._multiplierByProgram;
  }

  get multiplierByHardware() {
    return this._multiplierByHardware;
  }

  get totalMultiplier() {
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

    if (predictiveComputatorProcess?.isActive) {
      const predictiveComputatorProgram = predictiveComputatorProcess.program as PredictiveComputatorProgram;

      this._multiplierByProgram = predictiveComputatorProgram.calculateProgramCompletionSpeedMultiplier(
        predictiveComputatorProcess.usedCores,
        predictiveComputatorProcess.totalRam,
      );
    } else {
      this._multiplierByProgram = 1;
    }
  }

  private updateMultiplierByHardware() {
    const mainframeHardwareState = this._mainframeState.hardware;

    this._multiplierByHardware =
      1 +
      (mainframeHardwareState.performance.level - 1) *
        this._globalState.scenario.currentValues.mainframeSoftware.performanceBoost;
  }

  private updateTotalMultiplier() {
    this._totalMultiplier = this._multiplierByProgram * this._multiplierByHardware;
  }
}
