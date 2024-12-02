import { BaseController } from '@shared/base-controller';

export class AutomationMainframeHardwareAutobuyerController extends BaseController {
  get moneyShare() {
    return this.mainframeHardwareAutomationState.moneyShare;
  }

  set moneyShare(value: number) {
    this.mainframeHardwareAutomationState.moneyShare = value;
  }
}
