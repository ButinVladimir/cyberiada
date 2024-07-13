import { ReactiveController, ReactiveControllerHost } from 'lit';
import { AppState, APP_EVENTS } from '@state/app-state';
import { AppStateValue } from '@/state/general-state';

export class AppRootController implements ReactiveController {
  private _host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  hostConnected() {
    AppState.instance.on(
      APP_EVENTS.CHANGED_GAME_STATE,
      this.handleChangeGameStateCallback,
    );
    AppState.instance.startUp().catch((e) => {
      console.error(e);
    });
  }

  hostDisconnected() {
    AppState.instance.off(
      APP_EVENTS.CHANGED_GAME_STATE,
      this.handleChangeGameStateCallback,
    );
  }

  get gameState(): AppStateValue {
    return AppState.instance.generalState.currentState;
  }

  private handleChangeGameStateCallback = () => {
    this._host.requestUpdate();
  };
}
