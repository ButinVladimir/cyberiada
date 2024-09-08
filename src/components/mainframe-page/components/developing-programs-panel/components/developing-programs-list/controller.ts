import { MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS } from '@state/mainframe-developing-programs-state/constants';
import { BaseController } from '@shared/base-controller';
import { IDevelopingProgram } from '@state/mainframe-developing-programs-state/interfaces/developing-program';

export class DevelopingProgramsListController extends BaseController {
  hostConnected() {
    this.mainframeDevelopingProgramsState.addUiEventListener(
      MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAMS_UPDATED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.mainframeDevelopingProgramsState.removeUiEventListener(
      MAINFRAME_DEVELOPING_PROGRAMS_STATE_UI_EVENTS.DEVELOPING_PROGRAMS_UPDATED,
      this.handleRefreshUI,
    );
  }

  listDevelopingPrograms(): IDevelopingProgram[] {
    return this.mainframeDevelopingProgramsState.listDevelopingPrograms();
  }

  private handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
