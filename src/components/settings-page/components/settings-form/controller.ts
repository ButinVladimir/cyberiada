import { Language, LongNumberFormat, Theme } from '@shared/types';
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

  get maxTicksPerUpdate(): number {
    return this.settingsState.maxTicksPerUpdate;
  }

  get longNumberFormat(): LongNumberFormat {
    return this.settingsState.longNumberFormat;
  }

  async setLanguage(language: Language) {
    await this.settingsState.setLanguage(language);
    this.host.requestUpdate();
  }

  setTheme(theme: Theme) {
    this.settingsState.setTheme(theme);
    this.host.requestUpdate();
  }

  setMessageLogSize(messageLogSize: number) {
    this.settingsState.setMessageLogSize(messageLogSize);
    this.host.requestUpdate();
  }

  setUpdateInterval(updateInterval: number) {
    this.settingsState.setUpdateInterval(updateInterval);
    this.host.requestUpdate();
  }

  setAutosaveEnabled(autosaveEnabled: boolean) {
    this.settingsState.setAutosaveEnabled(autosaveEnabled);
    this.host.requestUpdate();
  }

  setAutosaveInterval(autosaveInterval: number) {
    this.settingsState.setAutosaveInterval(autosaveInterval);
    this.host.requestUpdate();
  }

  setMaxTicksPerUpdate(maxTicksPerUpdate: number) {
    this.settingsState.setMaxTicksPerUpdate(maxTicksPerUpdate);
    this.host.requestUpdate();
  }

  setLongNumberFormat(longNumberFormat: LongNumberFormat) {
    this.settingsState.setLongNumberFormat(longNumberFormat);
    this.host.requestUpdate();
  }
}
