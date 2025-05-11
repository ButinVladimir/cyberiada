import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { IncomeSource } from '@shared/types';
import type { IMainframeState } from '@state/mainframe-state/interfaces/mainframe-state';
import { TYPES } from '@state/types';
import { OtherProgramName } from '@state/mainframe-state/states/progam-factory/types';
import { ShareServerProgram } from '@state/mainframe-state/states/progam-factory/programs/share-server';
import { INCOME_SOURCES } from '@shared/constants';
import { IMoneyGrowthState } from '../interfaces/parameters/money-growth-state';

const { lazyInject } = decorators;

@injectable()
export class MoneyGrowthState implements IMoneyGrowthState {
  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  private _totalGrowth: number;
  private _growth: Map<IncomeSource, number>;

  constructor() {
    this._totalGrowth = 0;
    this._growth = new Map<IncomeSource, number>();
  }

  get totalGrowth() {
    return this._totalGrowth;
  }

  getGrowth(incomeSource: IncomeSource): number {
    return this._growth.get(incomeSource) ?? 0;
  }

  recalculateGrowth() {
    this.updateGrowthByProgram();
    this.updateTotalGrowth();
  }

  private updateGrowthByProgram() {
    const mainframeProcessesState = this._mainframeState.processes;

    const shareServerProcess = mainframeProcessesState.getProcessByName(OtherProgramName.shareServer);
    let incomeByProgram = 0;

    if (shareServerProcess?.isActive) {
      incomeByProgram = (shareServerProcess.program as ShareServerProgram).calculateMoneyDelta(
        shareServerProcess.usedCores,
        shareServerProcess.totalRam,
        1,
      );
    }

    this._growth.set(IncomeSource.program, incomeByProgram);
  }

  private updateTotalGrowth() {
    this._totalGrowth = INCOME_SOURCES.reduce((sum, incomeSource) => sum + this.getGrowth(incomeSource), 0);
  }
}
