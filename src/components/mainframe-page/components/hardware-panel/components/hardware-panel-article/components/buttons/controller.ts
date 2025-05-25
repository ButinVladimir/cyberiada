import { BaseController } from '@shared/base-controller';
import { IMainframeHardwareParameter, MainframeHardwareParameterType } from '@state/mainframe-state';

export class MainframeHardwarePanelArticleButtonsController extends BaseController {
  get developmentLevel() {
    return this.globalState.development.level;
  }

  get money(): number {
    return this.globalState.money.money;
  }

  get moneyGrowth(): number {
    return this.growthState.money.totalGrowth;
  }

  getLevel(type: MainframeHardwareParameterType): number {
    return this.getParameter(type).level;
  }

  checkCanPurchase(increase: number, type: MainframeHardwareParameterType): boolean {
    return this.getParameter(type).checkCanPurchase(increase);
  }

  getPurchaseCost(increase: number, type: MainframeHardwareParameterType): number {
    return this.getParameter(type).getIncreaseCost(increase);
  }

  private getParameter(type: MainframeHardwareParameterType): IMainframeHardwareParameter {
    switch (type) {
      case 'performance':
        return this.mainframeState.hardware.performance;
      case 'cores':
        return this.mainframeState.hardware.cores;
      case 'ram':
        return this.mainframeState.hardware.ram;
      default:
        throw new Error('Invalid hardware panel article type');
    }
  }
}
