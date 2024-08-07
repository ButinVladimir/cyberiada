import { Language, Theme } from '@shared/types';
import { BaseController } from '@shared/base-controller';

export class SettingsFormController extends BaseController {
  get language(): Language {
    return this.settingsState.language;
  }

  get theme(): Theme {
    return this.settingsState.theme;
  }

  get messageLogSize(): number {
    return this.settingsState.messageLogSize;
  }

  get updateInterval(): number {
    return this.settingsState.updateInterval;
  }

  get autosaveEnabled(): boolean {
    return this.settingsState.autosaveEnabled;
  }

  get autosaveInterval(): number {
    return this.settingsState.autosaveInterval;
  }

  async setLanguage(language: Language) {
    await this.settingsState.setLanguage(language);
    this.host.requestUpdate();
  }

  setTheme(theme: Theme) {
    this.settingsState.setTheme(theme);
  }

  setMessageLogSize(messageLogSize: number) {
    this.settingsState.setMessageLogSize(messageLogSize);
  }

  setUpdateInterval(updateInterval: number) {
    this.settingsState.setUpdateInterval(updateInterval);
  }

  setAutosaveEnabled(autosaveEnabled: boolean) {
    this.settingsState.setAutosaveEnabled(autosaveEnabled);
  }

  setAutosaveInterval(autosaveInterval: number) {
    this.settingsState.setAutosaveInterval(autosaveInterval);
  }
}
