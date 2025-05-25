import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { type IMainframeState, OtherProgramName, ShareServerProgram } from '@state/mainframe-state';
import { type ICompanyState } from '@state/company-state';
import { INCOME_SOURCES, IncomeSource } from '@shared/index';
import { IDevelopmentGrowthState } from '../interfaces/parameters/development-growth-state';

const { lazyInject } = decorators;

@injectable()
export class DevelopmentGrowthState implements IDevelopmentGrowthState {
  @lazyInject(TYPES.MainframeState)
  private _mainframeState!: IMainframeState;

  @lazyInject(TYPES.CompanyState)
  private _companyState!: ICompanyState;

  private _recalculated: boolean;
  private _totalGrowth: number;
  private _growth: Map<IncomeSource, number>;

  constructor() {
    this._recalculated = false;
    this._totalGrowth = 0;
    this._growth = new Map<IncomeSource, number>();
  }

  get totalGrowth() {
    this.recalculate();

    return this._totalGrowth;
  }

  getGrowth(incomeSource: IncomeSource): number {
    this.recalculate();

    return this._growth.get(incomeSource) ?? 0;
  }

  resetValues() {
    this._recalculated = false;
  }

  private recalculate() {
    if (this._recalculated) {
      return;
    }

    this._recalculated = true;

    this.updateGrowthByProgram();
    this.updateGrowthBySidejobs();
    this.updateTotalGrowth();
  }

  private updateGrowthByProgram() {
    const mainframeProcessesState = this._mainframeState.processes;

    const shareServerProcess = mainframeProcessesState.getProcessByName(OtherProgramName.shareServer);
    let incomeByProgram = 0;

    if (shareServerProcess?.isActive) {
      incomeByProgram = (shareServerProcess.program as ShareServerProgram).calculateDevelopmentPointsDelta(
        shareServerProcess.usedCores,
        shareServerProcess.totalRam,
        1,
      );
    }

    this._growth.set(IncomeSource.program, incomeByProgram);
  }

  private updateGrowthBySidejobs() {
    let incomeBySidejobs = 0;

    for (const sidejob of this._companyState.sidejobs.listSidejobs()) {
      if (!sidejob.isActive) {
        continue;
      }

      incomeBySidejobs += sidejob.calculateDevelopmentPointsDelta(1);
    }

    this._growth.set(IncomeSource.sidejob, incomeBySidejobs);
  }

  private updateTotalGrowth() {
    this._totalGrowth = INCOME_SOURCES.reduce((sum, incomeSource) => sum + this.getGrowth(incomeSource), 0);
  }
}
