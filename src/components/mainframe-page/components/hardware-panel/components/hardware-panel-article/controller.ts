import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { MAINFRAME_HARDWARE_STATE_UI_EVENTS } from '@state/mainframe/mainframe-hardware-state/constants';
import { BaseController } from '@shared/base-controller';
import { IMainframeHardwareParameter } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-parameter';
import { HardwarePanelArticleType } from './types';

export class MainframeHardwarePanelArticleController extends BaseController {
  hostConnected() {
    this.globalState.money.addUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_CHANGED, this.handleRefreshUI);
    this.globalState.cityDevelopment.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_LEVEL_CHANGED,
      this.handleRefreshUI,
    );
    this.mainframeHardwareState.addUiEventListener(
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPGRADED,
      this.handleRefreshUI,
    );
    this.globalState.computationalBase.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.MAINFRAME_DISCOUNT_CHANGED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.globalState.money.removeUiEventListener(GLOBAL_STATE_UI_EVENTS.MONEY_CHANGED, this.handleRefreshUI);
    this.globalState.cityDevelopment.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.CITY_DEVELOPMENT_LEVEL_CHANGED,
      this.handleRefreshUI,
    );
    this.mainframeHardwareState.removeUiEventListener(
      MAINFRAME_HARDWARE_STATE_UI_EVENTS.HARDWARE_UPGRADED,
      this.handleRefreshUI,
    );
    this.globalState.computationalBase.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.MAINFRAME_DISCOUNT_CHANGED,
      this.handleRefreshUI,
    );
  }

  get cityDevelopmentLevel() {
    return this.globalState.cityDevelopment.level;
  }

  getLevel(type: HardwarePanelArticleType): number {
    return this.getParameter(type).level;
  }

  purchase(increase: number, type: HardwarePanelArticleType) {
    this.getParameter(type).purchase(increase);
  }

  checkCanPurchase(increase: number, type: HardwarePanelArticleType): boolean {
    return this.getParameter(type).checkCanPurchase(increase);
  }

  getPurchaseCost(increase: number, type: HardwarePanelArticleType): number {
    return this.getParameter(type).getIncreaseCost(increase);
  }

  private getParameter(type: HardwarePanelArticleType): IMainframeHardwareParameter {
    switch (type) {
      case 'performance':
        return this.mainframeHardwareState.performance;
      case 'cores':
        return this.mainframeHardwareState.cores;
      case 'ram':
        return this.mainframeHardwareState.ram;
      default:
        throw new Error('Invalid hardware panel article type');
    }
  }
}
