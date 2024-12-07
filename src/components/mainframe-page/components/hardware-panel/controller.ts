import { MainframeHardwareParameterType } from '@state/mainframe/mainframe-hardware-state/types';
import { BaseController } from '@shared/base-controller';
import { IMainframeHardwareParameter } from '@state/mainframe/mainframe-hardware-state/interfaces/mainframe-hardware-parameter';

export class MainframeHardwarePanelController extends BaseController {
  listParameters(): IMainframeHardwareParameter[] {
    return this.mainframeHardwareState.listParameters();
  }

  moveParameter(parameterType: MainframeHardwareParameterType, newPosition: number) {
    this.mainframeHardwareState.moveParameter(parameterType, newPosition);
  }

  purchaseMax() {
    this.mainframeHardwareState.purchaseMax();
  }
}
