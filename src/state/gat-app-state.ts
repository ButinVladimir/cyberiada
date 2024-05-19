import { AppState, IAppState } from '@state/app-state';

let appStateInstance: AppState | undefined;

export const getAppStateInstance = (): IAppState => {
  if (!appStateInstance) {
    appStateInstance = new AppState();
  }

  return appStateInstance;
};
