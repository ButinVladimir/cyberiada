import { IAppState } from "@state/app-state/interfaces";
import { IGeneralState } from "./interfaces";
import { AppStateValue } from './types';

export class GeneralState implements IGeneralState {
  private _appState: IAppState;
  private _currentState: AppStateValue;

  constructor(appState: IAppState) {
    this._appState = appState;
    this._currentState = AppStateValue.loading;
  }

  get currentState() {
    return this._currentState;
  }

  startLoadingGame = (): void => {
    this._currentState = AppStateValue.loading;
  }

  startRunningGame = (): void => {
    this._currentState = AppStateValue.running;
  }
}