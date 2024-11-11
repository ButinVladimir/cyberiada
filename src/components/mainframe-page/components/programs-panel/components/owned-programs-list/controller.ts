import { MAINFRAME_PROGRAMS_STATE_UI_EVENTS } from '@/state/mainframe/mainframe-programs-state/constants';
import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';

export class OwnedProgramsListController extends BaseController {
  hostConnected() {
    this.mainframeProgramsState.addUiEventListener(
      MAINFRAME_PROGRAMS_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.mainframeProgramsState.removeUiEventListener(
      MAINFRAME_PROGRAMS_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED,
      this.handleRefreshUI,
    );
  }

  listOwnedPrograms(): IProgram[] {
    return this.mainframeProgramsState.listOwnedPrograms();
  }

  toggleAutoupgrade(active: boolean) {
    this.mainframeProgramsState.toggleProgramsAutoUpgrade(active);
  }
}
