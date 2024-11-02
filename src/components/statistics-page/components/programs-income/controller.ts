import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { BaseController } from '@shared/base-controller';

export class StatisticsProgramsIncomeController extends BaseController {
  hostConnected() {
    this.globalState.computationalBase.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.globalState.computationalBase.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED,
      this.handleRefreshUI,
    );
  }

  get computationalBaseByProgram() {
    return this.globalState.computationalBase.pointsByProgram;
  }
}
