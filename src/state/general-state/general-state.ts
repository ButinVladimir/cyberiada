import { injectable } from 'inversify';
import { IGeneralState, IGeneralSerializedState } from './interfaces';

@injectable()
export class GeneralState implements IGeneralState {
  private _randomSeed: number;

  constructor() {
    this._randomSeed = 0;
  }

  get randomSeed() {
    return this._randomSeed;
  }

  startNewState(): void {
    this._randomSeed = Date.now();
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
