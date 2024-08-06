import { Language, Theme } from '@shared/types';
import { BaseController } from '@shared/base-controller';

export class SettingsFormController extends BaseController {
  get language(): Language {
    return this.settingsState.language;
  }

  get theme(): Theme {
    return this.settingsState.theme;
  }

  async setLanguage(language: Language) {
    await this.settingsState.setLanguage(language);
    this.host.requestUpdate();
  }

  setTheme(theme: Theme) {
    this.settingsState.setTheme(theme);
  }
}
