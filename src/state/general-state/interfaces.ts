import { AppStateValue } from './types';

export interface IGeneralState {
  currentState: AppStateValue;
  startRunningGame(): void;
}
