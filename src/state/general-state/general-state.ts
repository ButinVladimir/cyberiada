import { injectable } from 'inversify';
import { IGeneralState, IGeneralSerializedState } from './interfaces';
import { AppStateValue } from './types';

@injectable()
export class GeneralState implements IGeneralState {
  private _currentState: AppStateValue;
  private _randomSeed: number;

  constructor() {
    this._currentState = AppStateValue.loading;
    this._randomSeed = 0;
  }

  get currentState() {
    return this._currentState;
  }

  get randomSeed() {
    return this._randomSeed;
  }

  startLoadingGame = (): void => {
    this._currentState = AppStateValue.loading;
  };

  startRunningGame = (): void => {
    this._currentState = AppStateValue.running;
  };

  startNewState(): void {
    this._randomSeed = Date.now();
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
