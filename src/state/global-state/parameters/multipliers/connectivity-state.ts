import { injectable } from 'inversify';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { EventBatcher } from '@shared/event-batcher';
import { TYPES } from '@state/types';
import { IConnectivityState } from '../../interfaces/parameters/connectivity-state';
import { IMultiplierSerializedState } from '../../interfaces/serialized-states/multiplier-serialized-state';

const { lazyInject } = decorators;

@injectable()
export class ConnectivityState implements IConnectivityState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  private _pointsByProgram: number;

  constructor() {
    this._pointsByProgram = 0;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
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
