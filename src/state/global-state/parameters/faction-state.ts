import { injectable } from 'inversify';
import { decorators } from '@state/container';
import { merge } from 'lodash';
import factions from '@configs/factions.json';
import { Faction } from '@shared/types';
import { EventBatcher } from '@shared/event-batcher';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { TYPES } from '@state/types';
import { IFactionValues } from '../interfaces/faction-values';
import { IFactionState } from '../interfaces/parameters/faction-state';
import { IFactionSerializedState } from '../interfaces/serialized-states/factions-serialized-state';

const { lazyInject } = decorators;

@injectable()
export class FactionState implements IFactionState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  private _currentFaction?: Faction;
  private _currentFactionValues?: IFactionValues;
  private _neutralFactionValues: IFactionValues;

  constructor() {
    this._neutralFactionValues = this.getFactionValues(Faction.neutral);

    this.uiEventBatcher = new EventBatcher();
  }

  get currentFaction(): Faction | undefined {
    return this._currentFaction;
  }

  set currentFaction(value: Faction | undefined) {
    this._currentFaction = value;
    this._currentFactionValues = value ? this.getFactionValues(value) : undefined;
  }

  get currentFactionValues() {
    return this._currentFactionValues;
  }

  get neutralFactionValues() {
    return this._neutralFactionValues;
  }

  getFactionValues(faction: Faction): IFactionValues {
    return merge({}, factions[faction]) as IFactionValues;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this.currentFaction = undefined;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IFactionSerializedState): Promise<void> {
    this.currentFaction = serializedState.currentFaction;
  }

  serialize(): IFactionSerializedState {
    return {
      currentFaction: this._currentFaction,
    };
  }
}
