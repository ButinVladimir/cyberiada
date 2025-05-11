import { BaseController } from '@shared/base-controller';
import { IMainframeHardwareParameter, MainframeHardwareParameterType } from '@state/mainframe-state';

export class MainframeHardwarePanelArticleController extends BaseController {
  get money(): number {
    return this.globalState.money.money;
  }

  get developmentLevel() {
    return this.globalState.development.level;
  }

  getParameter(type: MainframeHardwareParameterType): IMainframeHardwareParameter {
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
