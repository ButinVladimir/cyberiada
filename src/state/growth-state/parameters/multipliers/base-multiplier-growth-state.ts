import { injectable } from 'inversify';
import { decorators } from '@state/container';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { TYPES } from '@state/types';
import { ProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { IProcess } from '@state/mainframe-state/states/mainframe-processes-state/interfaces/process';
import { IMultiplierGrowthState } from '../../interfaces/parameters/multiplier-growth-state';

const { lazyInject } = decorators;

@injectable()
export abstract class BaseMultiplierGrowthState implements IMultiplierGrowthState {
  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  protected _growthByProgram: number;

  constructor() {
    this._growthByProgram = 0;
  }

  get growthByProgram() {
    return this._growthByProgram;
  }

  recalculateGrowth() {
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
