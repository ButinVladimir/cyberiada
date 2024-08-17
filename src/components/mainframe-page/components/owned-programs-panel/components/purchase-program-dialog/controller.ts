import { APP_UI_EVENTS } from '@state/app/constants';
import { GENERAL_STATE_UI_EVENTS } from '@state/general-state/constants';
import { BaseController } from '@shared/base-controller';
import { IProgram } from '@state/progam-factory/interfaces/program';
import { ProgramName } from '@state/progam-factory/types';

export class PurchaseProgramDialogController extends BaseController {
  hostConnected() {
    this.app.addUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
    this.generalState.addUiEventListener(GENERAL_STATE_UI_EVENTS.PURCHASE_COMPLETED, this.handleRefreshUI);
  }

  hostDisconnected() {
    this.app.removeUiEventListener(APP_UI_EVENTS.REFRESHED_UI, this.handleRefreshUI);
    this.generalState.removeUiEventListener(GENERAL_STATE_UI_EVENTS.PURCHASE_COMPLETED, this.handleRefreshUI);
  }

  get money(): number {
    return this.generalState.money;
  }

  getProgram(name: ProgramName, level: number, quality: number): IProgram {
    return this.programFactory.makeProgram({
      name,
      level,
      quality,
    });
  }

  purchaseProgram(name: ProgramName, level: number, quality: number): boolean {
    return this.mainframeOwnedProgramState.purchaseProgram({
      name,
      level,
      quality,
    });
  }

  handleRefreshUI = () => {
    this.host.requestUpdate();
  };
}
