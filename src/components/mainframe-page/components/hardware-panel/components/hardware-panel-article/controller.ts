import { BaseController } from '@shared/base-controller';
import { IMainframeHardwareParameter } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-parameter';
import { MainframeHardwareParameterType } from '@state/mainframe/mainframe-hardware-state/types';

export class MainframeHardwarePanelArticleController extends BaseController {
  get cityDevelopmentLevel() {
    return this.globalState.cityDevelopment.level;
  }

  isAutoUpgradeEnabled(type: MainframeHardwareParameterType): boolean {
    return this.getParameter(type).autoUpgradeEnabled;
  }

  toggleAutoUpdateEnabled(type: MainframeHardwareParameterType, active: boolean) {
    this.getParameter(type).autoUpgradeEnabled = active;
  }

  getLevel(type: MainframeHardwareParameterType): number {
    return this.getParameter(type).level;
  }

  purchase(increase: number, type: MainframeHardwareParameterType) {
    this.getParameter(type).purchase(increase);
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
