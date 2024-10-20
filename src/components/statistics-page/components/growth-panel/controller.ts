import { GROWTH_STATE_UI_EVENTS } from '@state/growth-state/constants';
import { BaseController } from '@shared/base-controller';
import { MS_IN_SECOND } from '@shared/constants';
import { IncomeSource } from '@shared/types';

export class StatisticsGrowthPanelController extends BaseController {
  hostConnected() {
    this.growthState.addUiEventListener(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.growthState.removeUiEventListener(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED, this.handleRefreshUI);
  }

  get programCompletionSpeed() {
    return this.growthState.programCompletionSpeed * MS_IN_SECOND;
  }

  get moneyIncomeTotal() {
    return this.growthState.moneyIncomeTotal * MS_IN_SECOND;
  }

  get cityDevelopmentSpeedTotal() {
    return this.growthState.cityDevelopmentSpeedTotal * MS_IN_SECOND;
  }

  get codebaseByProgram() {
    return this.growthState.codebaseIncomeByProgram * MS_IN_SECOND;
  }

  getMoneyIncome = (incomeSource: IncomeSource) => {
    return this.growthState.getMoneyIncomeBySource(incomeSource) * MS_IN_SECOND;
  };

  getCityDevelopmentSpeed = (incomeSource: IncomeSource) => {
    return this.growthState.getCityDevelopmentSpeedBySource(incomeSource) * MS_IN_SECOND;
  };

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
