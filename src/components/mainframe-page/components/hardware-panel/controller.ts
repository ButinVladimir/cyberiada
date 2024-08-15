import { APP_UI_EVENTS } from '@state/app/constants';
import { GENERAL_STATE_UI_EVENTS } from '@state/general-state/constants';
import { BaseController } from '@shared/base-controller';

export class MainframeHardwarePanelController extends BaseController {
  hostConnected() {
    this.app.addUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.PURCHASE_COMPLETED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.app.removeUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.PURCHASE_COMPLETED, this.handleRefreshUI);
  }

  get money(): number {
    return this.generalState.money;
  }

  get performance(): number {
    return this.mainframeHardwareState.performance;
  }

  get cores(): number {
    return this.mainframeHardwareState.cores;
  }

  get ram(): number {
    return this.mainframeHardwareState.ram;
  }

  getPerformanceIncreaseCost(increase: number): number {
    return this.mainframeHardwareState.getPerformanceIncreaseCost(increase);
  }

  purchasePerformanceIncrease(increase: number): void {
    this.mainframeHardwareState.purchasePerformanceIncrease(increase);
  }

  getCoresIncreaseCost(increase: number): number {
    return this.mainframeHardwareState.getCoresIncreaseCost(increase);
  }

  purchaseCoresIncrease(increase: number): void {
    this.mainframeHardwareState.purchaseCoresIncrease(increase);
  }

  getRamIncreaseCost(increase: number): number {
    return this.mainframeHardwareState.getRamIncreaseCost(increase);
  }

  purchaseRamIncrease(increase: number): void {
    this.mainframeHardwareState.purchaseRamIncrease(increase);
  }

  handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
