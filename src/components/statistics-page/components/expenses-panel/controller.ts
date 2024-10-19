import { BaseController } from '@shared/base-controller';
import { PurchaseType } from '@shared/types';
import { GENERAL_STATE_UI_EVENTS } from '@state/general-state/constants';

export class StatisticsExpensesPanelController extends BaseController {
  hostConnected() {
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.VALUES_CHANGED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.VALUES_CHANGED, this.handleRefreshUI);
  }

  getMoneyExpenses = (purchaseType: PurchaseType) => {
    return this.generalState.getMoneyExpenses(purchaseType);
  };

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
