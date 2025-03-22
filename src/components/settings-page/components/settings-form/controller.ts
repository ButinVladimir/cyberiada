import { Language, LongNumberFormat, Theme } from '@shared/types';
import { BaseController } from '@shared/base-controller';
import { MS_IN_SECOND } from '@shared/constants';

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

  get toastDuration(): number {
    return this.settingsState.toastDuration;
  }

  get fps(): number {
    return MS_IN_SECOND / this.settingsState.updateInterval;
  }

  get autosaveEnabledOnHide(): boolean {
    return this.settingsState.autosaveEnabledOnHide;
  }

  get autosaveInterval(): number {
    return this.settingsState.autosaveInterval;
  }

  get fastSpeedMultiplier(): number {
    return this.settingsState.fastSpeedMultiplier;
  }

  get maxUpdatesPerTick(): number {
    return this.settingsState.maxUpdatesPerTick;
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

  setToastDuration(duration: number) {
    this.settingsState.setToastDuration(duration);
    this.handleRefreshUI();
  }

  setUpdateFPS(fps: number) {
    this.settingsState.setUpdateInterval(MS_IN_SECOND / fps);
    this.handleRefreshUI();
  }

  setAutosaveEnabled(autosaveEnabled: boolean) {
    this.settingsState.setAutosaveEnabledOnHide(autosaveEnabled);
    this.handleRefreshUI();
  }

  setAutosaveInterval(autosaveInterval: number) {
    this.settingsState.setAutosaveInterval(autosaveInterval);
    this.handleRefreshUI();
  }

  setFastSpeedMultiplier(fastSpeedMultiplier: number) {
    this.settingsState.setFastSpeedMultiplier(fastSpeedMultiplier);
    this.handleRefreshUI();
  }

  setMaxUpdatesPerTick(maxUpdatesPerTick: number) {
    this.settingsState.setMaxUpdatesPerTick(maxUpdatesPerTick);
    this.handleRefreshUI();
  }

  setLongNumberFormat(longNumberFormat: LongNumberFormat) {
    this.settingsState.setLongNumberFormat(longNumberFormat);
    this.handleRefreshUI();
  }
}
