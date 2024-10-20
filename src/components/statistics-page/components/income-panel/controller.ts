import { GENERAL_STATE_UI_EVENTS } from '@state/general-state/constants';
import { GROWTH_STATE_UI_EVENTS } from '@state/growth-state/constants';
import { BaseController } from '@shared/base-controller';
import { IncomeSource } from '@shared/types';

export class StatisticsIncomePanelController extends BaseController {
  hostConnected() {
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.VALUES_CHANGED, this.handleRefreshUI);
    this.growthState.addUiEventListener(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.VALUES_CHANGED, this.handleRefreshUI);
    this.growthState.removeUiEventListener(GROWTH_STATE_UI_EVENTS.VALUES_CHANGED, this.handleRefreshUI);
  }

  get codebaseByProgram() {
    return this.growthState.codebasePointsByProgram;
  }

  getMoneyIncome = (incomeSource: IncomeSource) => {
    return this.generalState.getMoneyIncome(incomeSource);
  };

  getCityDevelopmentPointsIncome = (incomeSource: IncomeSource) => {
    return this.generalState.getCityDevelopmentPointsIncome(incomeSource);
  };

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
