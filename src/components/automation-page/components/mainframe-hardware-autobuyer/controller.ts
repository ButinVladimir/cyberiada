import { BaseController } from '@shared/base-controller';

export class AutomationMainframeHardwareAutobuyerController extends BaseController {
  get performanceShare() {
    return this.mainframeHardwareAutomationState.performanceShare;
  }

  set performanceShare(value: number) {
    this.mainframeHardwareAutomationState.performanceShare = value;
  }

  get coresShare() {
    return this.mainframeHardwareAutomationState.coresShare;
  }

  set coresShare(value: number) {
    this.mainframeHardwareAutomationState.coresShare = value;
  }

  get ramShare() {
    return this.mainframeHardwareAutomationState.ramShare;
  }

  set ramShare(value: number) {
    this.mainframeHardwareAutomationState.ramShare = value;
  }
}
