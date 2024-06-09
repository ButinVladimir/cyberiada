import { ReactiveController, ReactiveControllerHost } from 'lit';
import { IAppState, APP_EVENTS } from '@state/app-state';
import { container, TYPES } from '@state/container';

export class AppRootController implements ReactiveController {
  private _appState: IAppState;
  private _host: ReactiveControllerHost;
  private _isLoaded = false;

  get isLoaded() {
    return this._isLoaded;
  }

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
    this._appState = container.get<IAppState>(TYPES.appState);
  }

  hostConnected() {
    this._appState.eventEmitter.on(APP_EVENTS.loaded, this.handleLoadedCallback);
    this._appState.startGame();   
  }

  hostDisconnected() {
    this._appState.eventEmitter.off(APP_EVENTS.loaded, this.handleLoadedCallback);
  }

  private handleLoadedCallback = () => {
    this._isLoaded = true;
    this._host.requestUpdate();
  }
}