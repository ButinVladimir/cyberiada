import { IAppState } from '@state/app-state/interfaces';
import { IGeneralState } from "./interfaces";
import { AppStateValue } from './types';
import { IGeneralSerializedState } from './interfaces/general-serialized-state';

export class GeneralState implements IGeneralState {
  private _appState: IAppState;
  private _currentState: AppStateValue;
  private _randomSeed: string;

  constructor(appState: IAppState) {
    this._appState = appState;
    this._currentState = AppStateValue.loading;
    this._randomSeed = '';
  }

  get currentState() {
    return this._currentState;
  }

  get randomSeed() {
    return this._randomSeed;
  }

  startLoadingGame = (): void => {
    this._currentState = AppStateValue.loading;
  }

  startRunningGame = (): void => {
    this._currentState = AppStateValue.running;
  }

  startNewState(): void {
    this._randomSeed = Date.now().toString();
    this._currentState = AppStateValue.loading;
  }

  deserialize(serializedState: IGeneralSerializedState): void {
    this._randomSeed = serializedState.randomSeed;
  }

  serialize(): IGeneralSerializedState {
    return {
      randomSeed: this._randomSeed,
    };
  }
}