import { IMapGeneratorDistrictResult } from '@workers/map-generator/interfaces';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IEventBatcher, IPoint } from '@shared/interfaces';
import { DistrictType, Faction } from '@shared/types';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import { IDistrictState, IDistrictSerializedState, IDistrictParameters } from './interfaces';
import { DistrictUnlockState } from './types';
import { EventBatcher } from '@shared/event-batcher';
import { DistrictParameters } from './district-parameters';

const { lazyInject } = decorators;

export class DistrictState implements IDistrictState {
  readonly uiEventBatcher: IEventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  private _name;
  private _startingPoint: IPoint;
  private _districtType: DistrictType;
  private _faction;
  private _state: DistrictUnlockState;
  private _parameters: IDistrictParameters;

  private constructor() {
    this._name = '';
    this._startingPoint = { x: 0, y: 0 };
    this._districtType = DistrictType.suburb;
    this._faction = Faction.neutral;
    this._state = DistrictUnlockState.locked;
    this._parameters = new DistrictParameters(this);

    this.uiEventBatcher = new EventBatcher();

    this._stateUiConnector.registerEventEmitter(this);
  }

  static createByMapGenerator(mapGeneratorDistrictResult: IMapGeneratorDistrictResult): IDistrictState {
    const districtState = new DistrictState();
    districtState._name = mapGeneratorDistrictResult.name;
    districtState._startingPoint = mapGeneratorDistrictResult.startingPoint;
    districtState._districtType = mapGeneratorDistrictResult.districtType;
    districtState._faction = mapGeneratorDistrictResult.faction;
    districtState._state = DistrictUnlockState.locked;
    districtState._parameters.tier.setTier(mapGeneratorDistrictResult.tier);

    return districtState;
  }

  static deserialize(serializedState: IDistrictSerializedState): IDistrictState {
    const districtState = new DistrictState();
    districtState._name = serializedState.name;
    districtState._startingPoint = serializedState.startingPoint;
    districtState._districtType = serializedState.districtType;
    districtState._faction = serializedState.faction;
    districtState._state = serializedState.state;
    districtState._parameters.deserialize(serializedState.parameters);

    return districtState;
  }

  get name(): string {
    return this._name;
  }

  get startingPoint(): IPoint {
    return this._startingPoint;
  }

  get districtType(): DistrictType {
    return this._districtType;
  }

  get faction(): Faction {
    return this._faction;
  }

  get state(): DistrictUnlockState {
    return this._state;
  }

  set state(value: DistrictUnlockState) {
    this._state = value;
  }

  get parameters() {
    return this._parameters;
  }

  recalculate() {
    this._parameters.recalculate();
  }

  serialize(): IDistrictSerializedState {
    return {
      name: this._name,
      startingPoint: this._startingPoint,
      districtType: this._districtType,
      faction: this._faction,
      state: this._state,
      parameters: this._parameters.serialize(),
    };
  }
}
