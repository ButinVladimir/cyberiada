import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { BaseController } from '@shared/base-controller';

export class StatisticsMultipliersController extends BaseController {
  hostConnected() {
    this.globalState.programCompletionSpeed.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED,
      this.handleRefreshUI,
    );
    this.globalState.computationalBase.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.MAINFRAME_DISCOUNT_CHANGED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.globalState.programCompletionSpeed.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED,
      this.handleRefreshUI,
    );
    this.globalState.computationalBase.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.MAINFRAME_DISCOUNT_CHANGED,
      this.handleRefreshUI,
    );
  }

  get programCompletionSpeedMultiplier() {
    return this.globalState.programCompletionSpeed.multiplier;
  }

  get mainframeDiscount() {
    return this.globalState.computationalBase.discount;
  }
}
