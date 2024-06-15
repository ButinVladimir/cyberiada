import { ReactiveController, ReactiveControllerHost } from 'lit';
import { AppState, APP_EVENTS } from '@state/app-state';

export class AppRootController implements ReactiveController {
  private _host: ReactiveControllerHost;
  private _isLoaded = false;

  get isLoaded() {
    return this._isLoaded;
  }

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  hostConnected() {
    AppState.instance.eventEmitter.on(APP_EVENTS.startedRunning, this.handleLoadedCallback);
    AppState.instance.startGame().catch(e => {
      console.error(e);
    });
  }

  hostDisconnected() {
    AppState.instance.eventEmitter.off(APP_EVENTS.startedRunning, this.handleLoadedCallback);
  }

  private handleLoadedCallback = () => {
    this._isLoaded = true;
    this._host.requestUpdate();
  }
}