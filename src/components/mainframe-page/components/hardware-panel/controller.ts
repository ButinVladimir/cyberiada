import { MainframeHardwareParameterType } from '@state/mainframe-state/states/mainframe-hardware-state/types';
import { BaseController } from '@shared/base-controller';
import { IMainframeHardwareParameter } from '@state/mainframe-state/states/mainframe-hardware-state/interfaces/mainframe-hardware-parameter';

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
