import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { BaseController } from '@shared/base-controller';
import { MS_IN_SECOND } from '@shared/constants';

export class StatisticsProgramCompletionSpeedController extends BaseController {
  hostConnected() {
    this.globalState.addUiEventListener(GLOBAL_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.globalState.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.PROGRAM_COMPLETION_SPEED_CHANGED,
      this.handleRefreshUI,
    );
  }

  get programCompletionSpeed() {
    return this.globalState.programCompletionSpeed.speed * MS_IN_SECOND;
  }
}
