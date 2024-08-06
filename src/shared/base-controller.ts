import { ReactiveController, ReactiveControllerHost } from 'lit';
import { IAppState } from '@state/app-state/interfaces/app-state';
import { IGeneralState } from '@state/general-state/interfaces/general-state';
import { ISettingsState } from '@state/settings-state/interfaces/settings-state';
import { ICityState } from '@state/city-state/interfaces/city-state';
import { IMessageLogState } from '@state/message-log-state/interfaces/message-log-state';
import { container } from '@state/container';
import { TYPES } from '@state/types';
import { IApp } from '@state/app';

export class BaseController implements ReactiveController {
  protected host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected() {}

  hostDisconnected() {}

  protected get app(): IApp {
    return container.get<IApp>(TYPES.App);
  }

  protected get appState(): IAppState {
    return container.get<IAppState>(TYPES.AppState);
  }

  protected get generalState(): IGeneralState {
    return container.get<IGeneralState>(TYPES.GeneralState);
  }

  protected get settingsState(): ISettingsState {
    return container.get<ISettingsState>(TYPES.SettingsState);
  }

  protected get cityState(): ICityState {
    return container.get<ICityState>(TYPES.CityState);
  }

  protected get messageLogState(): IMessageLogState {
    return container.get<IMessageLogState>(TYPES.MessageLogState);
  }
}
