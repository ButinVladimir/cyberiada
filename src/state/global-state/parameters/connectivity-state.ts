import { injectable } from 'inversify';
import { IConnectivityState } from '../interfaces/parameters/connectivity-state';
import { IMultiplierSerializedState } from '../interfaces/serialized-states/multiplier-serialized-state';

@injectable()
export class ConnectivityState implements IConnectivityState {
  private _pointsByProgram: number;

  constructor() {
    this._pointsByProgram = 0;
  }

  get pointsByProgram() {
    return this._pointsByProgram;
  }

  increasePointsByProgram(delta: number) {
    this._pointsByProgram += delta;
  }

  async startNewState(): Promise<void> {
    this._pointsByProgram = 0;
  }

  async deserialize(serializedState: IMultiplierSerializedState): Promise<void> {
    this._pointsByProgram = serializedState.pointsByProgram;
  }

  serialize(): IMultiplierSerializedState {
    return {
      pointsByProgram: this._pointsByProgram,
    };
  }
}
