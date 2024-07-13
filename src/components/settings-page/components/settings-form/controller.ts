import { ReactiveController, ReactiveControllerHost } from 'lit';
import { AppState } from '@state/app-state';
import { ISettingsFormValues } from '@state/settings-state';
import { Language, Theme } from '@shared/constants';

export class SettingsFormController implements ReactiveController {
  private _host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  hostConnected() {}

  hostDisconnected() {}

  async applyFormValues(values: ISettingsFormValues): Promise<void> {
    await AppState.instance.settingsState.applyFormValues(values);
  }

  get language(): Language {
    return AppState.instance.settingsState.language;
  }

  get theme(): Theme {
    return AppState.instance.settingsState.theme;
  }
}
