import { APP_EVENTS } from '@state/app-state';
import { AppStateValue } from '@state/general-state';
import { BaseController } from '@shared/base-controller';

export class AppRootController extends BaseController {
  hostConnected() {
    this.appState.addUiEventListener(APP_EVENTS.CHANGED_GAME_STATE, this.handleChangeGameStateCallback);
    this.appState.startUp().catch((e) => {
      console.error(e);
    });
  }

  hostDisconnected() {
    this.appState.removeUiEventListener(APP_EVENTS.CHANGED_GAME_STATE, this.handleChangeGameStateCallback);
  }

  get gameState(): AppStateValue {
    return this.generalState.currentState;
  }

  private handleChangeGameStateCallback = () => {
    this.host.requestUpdate();
  };
}
