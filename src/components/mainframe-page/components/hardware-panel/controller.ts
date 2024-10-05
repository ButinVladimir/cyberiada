import { MAINFRAME_HARDWARE_STATE_UI_EVENTS } from '@state/mainframe/mainframe-hardware-state/constants';
import { GENERAL_STATE_UI_EVENTS } from '@state/general-state/constants';
import { BaseController } from '@shared/base-controller';

export class MainframeHardwarePanelController extends BaseController {
  hostConnected() {
    this.mainframeHardwareState.addUiEventListener(
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPDATED,
      this.handleRefreshUI,
    );
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.CITY_LEVEL_CHANGED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.mainframeHardwareState.removeUiEventListener(
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPDATED,
      this.handleRefreshUI,
    );
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.CITY_LEVEL_CHANGED, this.handleRefreshUI);
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

  get cityLevel(): number {
    return this.generalState.cityLevel;
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

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
