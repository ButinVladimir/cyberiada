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

  get maxUpdatesPerTick(): number {
    return this.settingsState.maxUpdatesPerTick;
  }

  get maxUpdatesPerFastForward(): number {
    return this.settingsState.maxUpdatesPerFastForward;
  }

  get longNumberFormat(): LongNumberFormat {
    return this.settingsState.longNumberFormat;
  }

  async setLanguage(language: Language) {
    await this.settingsState.setLanguage(language);
    this.handleRefreshUI();
  }

  setTheme(theme: Theme) {
    this.settingsState.setTheme(theme);
    this.handleRefreshUI();
  }

  setMessageLogSize(messageLogSize: number) {
    this.settingsState.setMessageLogSize(messageLogSize);
    this.handleRefreshUI();
  }

  setUpdateInterval(updateInterval: number) {
    this.settingsState.setUpdateInterval(updateInterval);
    this.handleRefreshUI();
  }

  setAutosaveEnabled(autosaveEnabled: boolean) {
    this.settingsState.setAutosaveEnabled(autosaveEnabled);
    this.handleRefreshUI();
  }

  setAutosaveInterval(autosaveInterval: number) {
    this.settingsState.setAutosaveInterval(autosaveInterval);
    this.handleRefreshUI();
  }

  setMaxUpdatesPerTick(maxUpdatesPerTick: number) {
    this.settingsState.setMaxUpdatesPerTick(maxUpdatesPerTick);
    this.handleRefreshUI();
  }

  setmaxUpdatesPerFastForward(maxUpdatesPerFastForward: number) {
    this.settingsState.setMaxUpdatesPerFastForward(maxUpdatesPerFastForward);
    this.handleRefreshUI();
  }

  setLongNumberFormat(longNumberFormat: LongNumberFormat) {
    this.settingsState.setLongNumberFormat(longNumberFormat);
    this.handleRefreshUI();
  }
}
