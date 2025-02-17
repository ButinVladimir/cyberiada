import { BaseController } from '@shared/base-controller';

export class AutomationMainframeProgramsAutobuyerController extends BaseController {
  get moneyShare() {
    return this.automationState.mainframePrograms.moneyShare;
  }

  set moneyShare(value: number) {
    this.automationState.mainframePrograms.moneyShare = value;
  }
}
