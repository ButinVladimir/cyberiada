import { BaseController } from '@shared/base-controller';

export class AutomationCloneLevelAutoupgraderController extends BaseController {
  get moneyShare() {
    return this.automationState.cloneLevel.moneyShare;
  }

  set moneyShare(value: number) {
    this.automationState.cloneLevel.moneyShare = value;
  }
}
