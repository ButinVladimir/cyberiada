import { BaseController } from '@shared/base-controller';

export class AutomationMainframeProgramsAutobuyerController extends BaseController {
  get moneyShare() {
    return this.mainframeProgramsAutomationState.moneyShare;
  }

  set moneyShare(value: number) {
    this.mainframeProgramsAutomationState.moneyShare = value;
  }
}
