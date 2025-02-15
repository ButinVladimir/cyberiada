import { BaseController } from '@shared/base-controller';

export class AutomationMainframeHardwareAutobuyerController extends BaseController {
  get moneyShare() {
    return this.automationState.mainframeHardware.moneyShare;
  }

  set moneyShare(value: number) {
    this.automationState.mainframeHardware.moneyShare = value;
  }
}
