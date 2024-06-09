import { ReactiveController, ReactiveControllerHost } from 'lit';
import { ISettingsFormValues, ISettingsState, SETTINGS_EVENTS } from '@state/settings-state';
import { container, TYPES } from '@state/container';
import { Language, Theme } from '@shared/constants';

export class SettingsPageController implements ReactiveController {
  private _settingsState: ISettingsState;
  private _host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
    this._settingsState = container.get<ISettingsState>(TYPES.settingsState);
  }

  hostConnected() {
    this._settingsState.eventEmitter.on(SETTINGS_EVENTS.updated, this.handleUpdatedCallback);
  }

  hostDisconnected() {
    this._settingsState.eventEmitter.off(SETTINGS_EVENTS.updated, this.handleUpdatedCallback);
  }

  applyFormValues(values: ISettingsFormValues) {
    this._settingsState.applyFormValues(values);
  }

  get language(): Language {
    return this._settingsState.language;
  }

  get theme(): Theme {
    return this._settingsState.theme;
  }

  private handleUpdatedCallback = () => {
    this._host.requestUpdate();
  }
}