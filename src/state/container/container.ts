import { Container } from 'inversify';
import { IAppState, AppState } from '@state/app-state';
import { ISettingsState, SettingsState } from '@state/settings-state';
import { TYPES } from './constants';

const container = new Container();

container
  .bind<ISettingsState>(TYPES.settingsState)
  .to(SettingsState)
  .inSingletonScope();

container
  .bind<IAppState>(TYPES.appState)
  .to(AppState)
  .inSingletonScope();

export { container };