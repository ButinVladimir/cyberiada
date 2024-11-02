import { MAINFRAME_OWNED_PROGRAMES_STATE_UI_EVENTS } from '@state/mainframe/mainframe-owned-programs-state/constants';
import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';

export class OwnedProgramsListController extends BaseController {
  hostConnected() {
    this.mainframeOwnedProgramState.addUiEventListener(
      MAINFRAME_OWNED_PROGRAMES_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED,
      this.handleRefreshUI,
    );
  }

  hostDisconnected() {
    this.mainframeOwnedProgramState.removeUiEventListener(
      MAINFRAME_OWNED_PROGRAMES_STATE_UI_EVENTS.OWNED_PROGRAMS_UPDATED,
      this.handleRefreshUI,
    );
  }

  listOwnedPrograms(): IProgram[] {
    return this.mainframeOwnedProgramState.listOwnedPrograms();
  }
}
