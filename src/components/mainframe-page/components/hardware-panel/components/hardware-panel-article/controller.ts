import { BaseController } from '@shared/base-controller';
import { IMainframeHardwareParameter } from '@state/mainframe-state/states/mainframe-hardware-state/interfaces/mainframe-hardware-parameter';
import { MainframeHardwareParameterType } from '@state/mainframe-state/states/mainframe-hardware-state/types';

export class MainframeHardwarePanelArticleController extends BaseController {
  get money(): number {
    return this.globalState.money.money;
  }

  get developmentLevel() {
    return this.globalState.development.level;
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

  purchaseMax(type: MainframeHardwareParameterType) {
    this.getParameter(type).purchaseMax();
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
