import { IAppState } from "@state/app-state/interfaces";
import { IGeneralState } from "./interfaces";
import { AppStateValue } from './types';
import { APP_EVENTS } from '@state/app-state/constants';

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

  startRunningGame = (): void => {
    this._currentState = AppStateValue.running;
    this._appState.eventEmitter.emit(APP_EVENTS.startedRunning);
  }
}