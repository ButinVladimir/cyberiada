import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { TYPES } from '@state/types';
import { ProgramName } from '@state/progam-factory/types';
import { CodeGeneratorProgram } from '@state/progam-factory/programs/code-generator';
import { ICodeBaseGrowthState } from '../interfaces/parameters/code-base-growth-state';
import { GROWTH_STATE_UI_EVENTS } from '../constants';

const { lazyInject } = decorators;

@injectable()
export class CodeBaseGrowthState implements ICodeBaseGrowthState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  private _growthByProgram: number;
  private _updateRequested: boolean;

  constructor() {
    this._growthByProgram = 0;

    this._updateRequested = true;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get growthByProgram() {
    this._stateUiConnector.connectEventHandler(this, GROWTH_STATE_UI_EVENTS.CODE_BASE_GROWTH_CHANGED);

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

    this.uiEventBatcher.enqueueEvent(GROWTH_STATE_UI_EVENTS.CODE_BASE_GROWTH_CHANGED);
  }

  private updateGrowthByProgram(): void {
    const mainframeProcessesState = this._mainframeState.processes;

    const process = mainframeProcessesState.getProcessByName(ProgramName.codeGenerator);
    let value = 0;

    if (process?.isActive) {
      const program = process.program as CodeGeneratorProgram;

      value =
        (program.calculateDelta(process.threads) * process.calculateCompletionDelta(1)) / process.maxCompletionPoints;
    }

    this._growthByProgram = value;
  }
}
