import { Container } from 'inversify';
import { App, IApp } from '@state/app';
import { AppState, IAppState } from '@state/app-state';
import { GeneralState, IGeneralState } from '@state/general-state';
import { SettingsState, ISettingsState } from '@state/settings-state';
import { CityState, ICityState } from '@state/city-state';
import { TYPES } from './types';

export const container = new Container();

container.bind<IApp>(TYPES.App).to(App).inSingletonScope().whenTargetIsDefault();
container.bind<IAppState>(TYPES.AppState).to(AppState).inSingletonScope().whenTargetIsDefault();
container.bind<IGeneralState>(TYPES.GeneralState).to(GeneralState).inSingletonScope().whenTargetIsDefault();
container.bind<ISettingsState>(TYPES.SettingsState).to(SettingsState).inSingletonScope().whenTargetIsDefault();
container.bind<ICityState>(TYPES.CityState).to(CityState).inSingletonScope().whenTargetIsDefault();
