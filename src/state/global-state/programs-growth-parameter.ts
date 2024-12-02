import { EventBatcher } from '@shared/event-batcher';
import { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { ProgramName } from '@state/progam-factory/types';
import { CodeGeneratorProgram } from '../progam-factory/programs/code-generator';
import { IProgramsGrowthParameter } from './interfaces/programs-growth-parameter';
import { IProgramsGrowthConstructorParameters } from './interfaces/constructor-parameters/programs-growth-constructor-parameters';
import { GLOBAL_STATE_UI_EVENTS } from './constants';

export class ProgramsGrowthParameter implements IProgramsGrowthParameter {
  readonly uiEventBatcher: EventBatcher;

  private _stateUiConnector: IStateUIConnector;
  private _mainframeProcessesState: IMainframeProcessesState;

  private _computationalBase: number;
  private _updateRequested: boolean;

  constructor(parameters: IProgramsGrowthConstructorParameters) {
    this._stateUiConnector = parameters.stateUiConnector;
    this._mainframeProcessesState = parameters.mainframeProcessesState;

    this._computationalBase = 0;

    this._updateRequested = true;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get computationalBase() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.GROWTH_BY_PROGRAM_CHANGED);

    return this._computationalBase;
  }

  requestRecalculation() {
    this._updateRequested = true;
  }

  recalculate() {
    if (!this._updateRequested) {
      return;
    }

    this._updateRequested = false;

    this.updateComputationalBase();

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.GROWTH_BY_PROGRAM_CHANGED);
  }

  private updateComputationalBase(): void {
    const process = this._mainframeProcessesState.getProcessByName(ProgramName.codeGenerator);
    let value = 0;

    if (process?.isActive) {
      const program = process.program as CodeGeneratorProgram;

      value =
        (program.calculateDelta(process.threads) * process.calculateCompletionDelta(1)) / process.maxCompletionPoints;
    }

    this._computationalBase = value;
  }
}
