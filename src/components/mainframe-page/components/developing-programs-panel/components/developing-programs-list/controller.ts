import { APP_UI_EVENTS } from '@state/app/constants';
import { MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS } from '@state/mainframe-developing-programs-state/constants';
import { BaseController } from '@shared/base-controller';
import { IDevelopingProgram } from '@state/mainframe-developing-programs-state/interfaces/developing-program';

export class DevelopingProgramsListController extends BaseController {
  hostConnected() {
    this.app.addUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
    this.mainframeDevelopingProgramsStart.addUiEventListener(
      MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAMS_UPDATED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.app.removeUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
    this.mainframeDevelopingProgramsStart.removeUiEventListener(
      MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAMS_UPDATED,
      this.handleRefreshUI,
    );
  }

  listDevelopingPrograms(): IDevelopingProgram[] {
    return this.mainframeDevelopingProgramsStart.listDevelopingPrograms();
  }

  handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
