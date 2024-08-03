import { ISettingsFormValues } from '@state/settings-state';
import { Language, Theme } from '@shared/constants';
import { BaseController } from '@shared/base-controller';

export class SettingsFormController extends BaseController {
  async applyFormValues(values: ISettingsFormValues): Promise<void> {
    await this.settingsState.applyFormValues(values);
  }

  get language(): Language {
    return this.settingsState.language;
  }

  get theme(): Theme {
    return this.settingsState.theme;
  }
}
