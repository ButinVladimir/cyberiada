import { AppStateValue } from './types';

export interface IGeneralState {
  currentState: AppStateValue;
  startLoadingGame(): void;
  startRunningGame(): void;
}
