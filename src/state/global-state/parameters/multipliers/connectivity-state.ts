import { injectable } from 'inversify';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import type { IGrowthState } from '@state/growth-state/interfaces/growth-state';
import { EventBatcher } from '@shared/event-batcher';
import { TYPES } from '@state/types';
import type { IGlobalState } from '../../interfaces/global-state';
import { IConnectivityState } from '../../interfaces/parameters/connectivity-state';
import { IMultiplierSerializedState } from '../../interfaces/serialized-states/multiplier-serialized-state';
import { GLOBAL_STATE_UI_EVENTS } from '../../constants';

const { lazyInject } = decorators;

@injectable()
export class ConnectivityState implements IConnectivityState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  private globalState!: IGlobalState;

  @lazyInject(TYPES.GrowthState)
  private growthState!: IGrowthState;

  private _pointsByProgram: number;

  constructor() {
    this._pointsByProgram = 0;

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get pointsByProgram() {
    this._stateUiConnector.connectEventHandler(this, GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED);

    return this._pointsByProgram;
  }

  increasePointsByProgram(delta: number) {
    this._pointsByProgram += delta;

    this.uiEventBatcher.enqueueEvent(GLOBAL_STATE_UI_EVENTS.POINTS_BY_PROGRAM_CHANGED);
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
