import { Container } from 'inversify';
import { IAppState, AppState } from '@state/app-state';
import { containerIdentifiers } from './constants';

export const container = new Container();

container
  .bind<IAppState>(containerIdentifiers.appState)
  .to(AppState)
  .inSingletonScope();
