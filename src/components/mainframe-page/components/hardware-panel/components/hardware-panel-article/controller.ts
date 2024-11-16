import { BaseController } from '@shared/base-controller';
import { IMainframeHardwareParameter } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-parameter';
import { HardwarePanelArticleType } from './types';

export class MainframeHardwarePanelArticleController extends BaseController {
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
