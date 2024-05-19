import { ReactiveController, ReactiveControllerHost } from 'lit';
import { IAppState, events } from '@state/app-state';
import { container, containerIdentifiers } from '@state/container';

export class AppRootController implements ReactiveController {
  private appState: IAppState;
  private host: ReactiveControllerHost;
  private _isLoaded = false;

  get isLoaded() {
    return this._isLoaded;
  }

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
    this.appState = container.get<IAppState>(containerIdentifiers.appState);
  }

  hostConnected() {
    this.appState.eventEmitter.on(events.loaded, this.handleLoadedCallback);
    this.appState.startGame();   
  }

  hostDisconnected() {
    this.appState.eventEmitter.off(events.loaded, this.handleLoadedCallback);
  }

  private handleLoadedCallback = () => {
    this._isLoaded = true;
    this.host.requestUpdate();
  }
}