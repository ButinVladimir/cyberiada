import { EventBatcher } from '@shared/event-batcher';
import { IMainframeProcessesState } from '@state/mainframe/mainframe-processes-state/interfaces/mainframe-processes-state';
import { ProgramName } from '@state/progam-factory/types';
import { CodeGeneratorProgram } from '../progam-factory/programs/code-generator';
import { IProgramsGrowthParameter } from './interfaces/programs-growth-parameter';
import { IMoneyGrowthConstructorParameters } from './interfaces/constructor-parameters/money-growth-constructor-parameters';
import { GLOBAL_STATE_UI_EVENTS } from './constants';

export class ProgramsGrowthParameter implements IProgramsGrowthParameter {
  private _mainframeProcessesState: IMainframeProcessesState;

  private readonly _uiEventBatcher: EventBatcher;

  private _computationalBase: number;
  private _updateRequested: boolean;

  constructor(parameters: IMoneyGrowthConstructorParameters) {
    this._mainframeProcessesState = parameters.mainframeProcessesState;

    this._computationalBase = 0;

    this._updateRequested = true;

    this._uiEventBatcher = new EventBatcher();
  }

  get computationalBase() {
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

    this._uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.GROWTH_BY_PROGRAM_CHANGED);
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
