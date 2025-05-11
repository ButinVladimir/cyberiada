import { MainframeHardwareParameterType, IMainframeHardwareParameter } from '@state/mainframe-state';
import { BaseController } from '@shared/index';

export class MainframeHardwarePanelController extends BaseController {
  listParameters(): IMainframeHardwareParameter[] {
    return this.mainframeState.hardware.listParameters();
  }

  moveParameter(parameterType: MainframeHardwareParameterType, newPosition: number) {
    this.mainframeState.hardware.moveParameter(parameterType, newPosition);
  }

  purchaseMax() {
    this.mainframeState.hardware.purchaseMax();
  }
}
