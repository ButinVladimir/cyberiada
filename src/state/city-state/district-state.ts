import districtTypes from '@configs/district-types.json';
import { IMapGeneratorDistrictResult } from '@workers/map-generator/interfaces';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { IEventBatcher, IPoint } from '@shared/interfaces';
import { DistrictType, Faction } from '@shared/types';
import { decorators } from '@state/container';
import { TYPES } from '@state/types';
import {
  IDistrictState,
  IDistrictSerializedState,
  IDistrictParameters,
  IDistrictTypeTemplate,
  IDistrictArguments,
} from './interfaces';
import { DistrictUnlockState } from './types';
import { EventBatcher } from '@shared/event-batcher';
import { DistrictParameters } from './district-parameters';

const { lazyInject } = decorators;

export class DistrictState implements IDistrictState {
  readonly uiEventBatcher: IEventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUiConnector!: IStateUIConnector;

  private _index: number;
  private _name: string;
  private _startingPoint: IPoint;
  private _districtType: DistrictType;
  private _faction;
  private _state: DistrictUnlockState;
  private _parameters: IDistrictParameters;

  private _template: IDistrictTypeTemplate;

  private constructor(args: IDistrictArguments) {
    this._index = args.index;
    this._name = args.name;
    this._startingPoint = args.startingPoint;
    this._districtType = args.districtType;
    this._faction = args.faction;
    this._state = args.state;
    this._parameters = new DistrictParameters(this);

    this._template = districtTypes[this._districtType] as IDistrictTypeTemplate;

    this.uiEventBatcher = new EventBatcher();

    this._stateUiConnector.registerEventEmitter(this);
  }

  static createByMapGenerator(index: number, mapGeneratorDistrictResult: IMapGeneratorDistrictResult): IDistrictState {
    const districtState = new DistrictState({
      ...mapGeneratorDistrictResult,
      index,
      state: DistrictUnlockState.locked,
    });

    districtState._parameters.tier.setTier(mapGeneratorDistrictResult.tier);

    return districtState;
  }

  static deserialize(index: number, serializedState: IDistrictSerializedState): IDistrictState {
    const districtState = new DistrictState({
      ...serializedState,
      index,
    });

    districtState._parameters.deserialize(serializedState.parameters);

    return districtState;
  }

  get index() {
    return this._index;
  }

  get template() {
    return this._template;
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
