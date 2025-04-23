import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { TYPES } from '@state/types';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { IMultiplierGrowthState } from '../../interfaces/parameters/multiplier-growth-state';

const { lazyInject } = decorators;

@injectable()
export abstract class BaseMultiplierGrowthState implements IMultiplierGrowthState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  protected _growthByProgram: number;
  private _updateRequested: boolean;

  constructor() {
    this._growthByProgram = 0;

    this._updateRequested = true;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get growthByProgram() {
    return this._growthByProgram;
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
  }

  private updateGrowthByProgram(): void {
    const mainframeProcessesState = this._mainframeState.processes;

    const process = mainframeProcessesState.getProcessByName(this.getProgramName());
    this._growthByProgram = 0;

    if (process?.isActive) {
      this.handleUpdateByProgram(process);
    }
  }

  protected abstract getProgramName(): ProgramName;

  protected abstract handleUpdateByProgram(process: IProcess): void;
}
