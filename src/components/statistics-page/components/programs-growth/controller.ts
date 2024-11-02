import { GLOBAL_STATE_UI_EVENTS } from '@state/global-state/constants';
import { BaseController } from '@shared/base-controller';
import { MS_IN_SECOND } from '@shared/constants';

export class StatisticsProgramsGrowthController extends BaseController {
  hostConnected() {
    this.globalState.programsGrowth.addUiEventListener(
      GLOBAL_STATE_UI_EVENTS.GROWTH_BY_PROGRAM_CHANGED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.globalState.programsGrowth.removeUiEventListener(
      GLOBAL_STATE_UI_EVENTS.GROWTH_BY_PROGRAM_CHANGED,
      this.handleRefreshUI,
    );
  }

  get computationalBaseByProgram() {
    return this.globalState.programsGrowth.computationalBase * MS_IN_SECOND;
  }
}
